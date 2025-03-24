import React from 'react';

import styles from '@/styles/Dashboard.module.css';
import Layout from '@/components/Layout';

export default function Exams() {  
  return (
    <div className={styles.container}>

    </div>
  );
}

Exams.getLayout = (page: React.ReactElement) => (
  <Layout title="Provas">
    {page}
  </Layout>
);