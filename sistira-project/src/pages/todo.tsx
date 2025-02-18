import React from 'react';

import styles from '@/styles/Dashboard.module.css';

import SideBar from "@/components/SideBar"
import Header from '@/components/Header';

export default function Todo() {
  return (
    <div className={styles.container}>
      <Header />

      <SideBar />

      <main className={styles.content}>
        <h1>To-do</h1>
      </main>
    </div>
  );
}
