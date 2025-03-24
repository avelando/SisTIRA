import React from 'react';

import styles from '@/styles/Dashboard.module.css';
import Layout from '@/components/Layout';

export default function Todo() {
  return (
    <div className={styles.container}>

    </div>
  );
}

Todo.getLayout = (page: React.ReactElement) => (
  <Layout title="Todo">
    {page}
  </Layout>
);