import React from 'react';

import styles from '@/styles/Dashboard.module.css';

import SideBar from "@/components/SideBar"
import Header from '@/components/Header';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Header />

      <SideBar />

      <main className={styles.content}>
        <h1>Questões</h1>
      </main>
    </div>
  );
}
