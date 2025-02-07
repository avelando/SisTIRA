import React from 'react';
import styles from '@/styles/GoogleAuthButton.module.css';

interface GoogleAuthButtonProps {
  text: string;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ text }) => {
  return (
    <button className={styles.googleButton}>
      <img src="./google-logo.png" alt="Google Icon" className={styles.googleIcon} />
      {text}
    </button>
  );
};

export default GoogleAuthButton;
