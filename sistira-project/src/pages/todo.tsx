import React, { useState } from 'react';

import styles from '@/styles/Dashboard.module.css';

import SideBar from "@/components/SideBar"
import Header from '@/components/Header';

export default function Friends() {
  const [user, setUser] = useState<UserProps | null>(null);

  return (
    <div className={styles.container}>
      <Header user={user} title="To-do" />

      <SideBar />
    </div>
  );
}
