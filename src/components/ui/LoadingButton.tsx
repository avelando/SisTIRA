import React from 'react';
import styles from '@/styles/LoadingButton.module.css';

interface LoadingButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  loading = false,
  onClick,
  type = 'button',
  className = '',
}) => (
  <button
    type={type}
    onClick={loading ? undefined : onClick}
    disabled={loading}
    className={`${styles.button} ${className} ${loading ? styles.loading : ''}`}
  >
    {loading && <span className={styles.spinner} aria-hidden="true" />}
    <span className={styles.content}>{children}</span>
  </button>
);

export default LoadingButton;
