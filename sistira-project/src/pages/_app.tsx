import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { NextPageWithLayout } from '@/types/nextPageWithLayout';
import { checkAuth } from '@/pages/api/auth';
import { UserProps } from '@/interfaces/UserProps';
import '../styles/globals.css';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await checkAuth();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Erro em checkAuth:', error);
      }
    }
    fetchUser();
  }, []);

  const getLayout =
    Component.getLayout ||
    ((page) => <Layout user={user}>{page}</Layout>);

  return getLayout(<Component {...pageProps} />);
}
