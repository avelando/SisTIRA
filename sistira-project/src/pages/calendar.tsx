import React, { useState } from 'react';

import styles from '@/styles/Dashboard.module.css';
import Layout from '@/components/Layout';

export default function Calendar() {  
  return (
    <div className={styles.container}>
    </div>
  );
}

Calendar.getLayout = (page: React.ReactElement) => (
  <Layout title="Calendário">
    {page}
  </Layout>
);