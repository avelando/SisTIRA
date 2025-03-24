import React from 'react';

import styles from '@/styles/Dashboard.module.css';
import Layout from '@/components/Layout';

export default function Friends() {

  return (
    <div className={styles.container}>
    </div>
  );
}

Friends.getLayout = (page: React.ReactElement) => (
  <Layout title="Amigos">
    {page}
  </Layout>
);