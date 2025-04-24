import React from 'react';
import styles from '@/styles/ui/AuthButton.module.css';
import { AuthButtonProps } from '@/interfaces/AuthButtonProps';

const AuthButton: React.FC<AuthButtonProps> = ({ text, onClick }: AuthButtonProps) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
};

export default AuthButton;
