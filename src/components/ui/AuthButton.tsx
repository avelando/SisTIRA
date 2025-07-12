'use client';

import React from 'react';
import { AuthButtonProps } from '@/interfaces/AuthButtonProps';
import styles from '@/styles/AuthButton.module.css';

export default function AuthButton({ text, onClick, className = '' }: AuthButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles.base} ${className}`}
    >
      {text}
    </button>
  );
}
