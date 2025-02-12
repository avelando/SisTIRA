import React from 'react';

import styles from '@/styles/Dashboard.module.css';

import Card from '@/components/Card';
import SideBar from "@/components/SideBar"

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>S</div>
        <div className={styles.profile}>
          <span>Avelar @avelando</span>
        </div>
      </nav>

      <SideBar />

      <main className={styles.content}>
        <h1>Questões</h1>
      </main>
    </div>
  );
}
