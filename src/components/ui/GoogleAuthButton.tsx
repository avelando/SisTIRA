'use client';

import React from 'react';
import Image from 'next/image';
import styles from '@/styles/GoogleAuthButton.module.css';

interface GoogleAuthButtonProps {
  content: string;
  redirectUrl: string;
}

export default function GoogleAuthButton({ content, redirectUrl }: GoogleAuthButtonProps) {
  const handleClick = () => {
    window.location.href = redirectUrl;
  };

  return (
    <button onClick={handleClick} className={styles.button}>
      <Image
        src="/assets/google-logo.png"
        alt="Google Icon"
        width={20}
        height={20}
        className={styles.icon}
      />
      {content}
    </button>
  );
}
