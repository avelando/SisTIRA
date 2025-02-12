import React from 'react';
import styles from '@/styles/AuthButton.module.css';

const AuthButton: React.FC<AuthButtonProps> = ({ text, onClick }: AuthButtonProps) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
};

export default AuthButton;
