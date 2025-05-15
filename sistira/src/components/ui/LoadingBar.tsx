'use client';

import React from 'react';
import styles from '@/styles/ui/LoadingBar.module.css';

interface LoadingBarProps {
  loading: boolean;
}

export default function LoadingBar({ loading }: LoadingBarProps) {
  return loading ? <div className={styles.bar} /> : null;
}
