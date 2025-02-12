import React from 'react';
import styles from '@/styles/GoogleAuthButton.module.css';

const GoogleAuthButton: React.FC<ButtonProps> = ({ content }: ButtonProps) => {
  return (
    <button className={styles.googleButton}>
      <img src="./google-logo.png" alt="Google Icon" className={styles.googleIcon} />
      {content}
    </button>
  );
};

export default GoogleAuthButton;
