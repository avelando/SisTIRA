import React from 'react';

import styles from '@/styles/Dashboard.module.css';
import Layout from '@/components/Layout';

export default function Rooms() {

  return (
    <div className={styles.container}>
      
    </div>
  );
}

Rooms.getLayout = (page: React.ReactElement) => (
  <Layout title="Salas">
    {page}
  </Layout>
);