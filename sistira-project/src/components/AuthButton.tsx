import React from 'react';
import styles from '@/styles/AuthButton.module.css';

interface AuthButtonProps {
  text: string;
  onClick: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
};

export default AuthButton;
