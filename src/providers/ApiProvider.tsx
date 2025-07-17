'use client';

import { ReactNode, useEffect } from 'react';
import { configureApi } from 'sistira';

interface ApiProviderProps {
  children: ReactNode;
}

export default function ApiProvider({ children }: ApiProviderProps) {
  useEffect(() => {
    configureApi(process.env.NEXT_PUBLIC_API_URL!);
  }, []);

  return <>{children}</>;
}
