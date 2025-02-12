import React from 'react';
import Link from 'next/link';
import styles from '@/styles/BackButton.module.css';

const BackButton = ({ text }: TextProps) => {
  return (
    <Link href="/">
      <div className={styles.backButton}>
        <div className={styles.triangle}></div>
        <div className={styles.retangle}>
          <span>{ text }</span>
        </div>
      </div>
    </Link>
  );
};

export default BackButton;
