'use client';

import React from 'react';
import Link from 'next/link';
import styles from '@/styles/BackButton.module.css';

interface BackButtonProps {
  text: string;
}

export default function BackButton({ text }: BackButtonProps) {
  return (
    <Link href="/">
      <div className={styles.backButton}>
        <div className={styles.arrow} />
        <div className={styles.textContainer}>
          <span>{text}</span>
        </div>
      </div>
    </Link>
  );
}
