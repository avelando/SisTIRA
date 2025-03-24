import React from 'react';

import styles from '@/styles/Dashboard.module.css';
import Layout from '@/components/Layout';

export default function QuestionBank() {

  return (
    <div className={styles.container}>

    </div>
  );
}

QuestionBank.getLayout = (page: React.ReactElement) => (
  <Layout title="Banco de questão">
    {page}
  </Layout>
);
