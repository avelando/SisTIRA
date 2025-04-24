import React from 'react';
import Link from 'next/link';
import styles from '@/styles/ui/BackButton.module.css';
import { ButtonProps } from '@/interfaces/ButtonProps';

const BackButton = ({ text }: ButtonProps) => {
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
