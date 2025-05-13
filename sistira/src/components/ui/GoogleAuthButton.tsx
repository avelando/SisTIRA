import React from 'react';
import styles from '@/styles/ui/GoogleAuthButton.module.css';
import Image from 'next/image';
import { ButtonProps } from '@/interfaces/ButtonProps';

interface GoogleAuthButtonProps extends ButtonProps {
  redirectUrl: string;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ content, redirectUrl }) => {
  const handleClick = () => {
    window.location.href = redirectUrl;
  };

  return (
    <button className={styles.googleButton} onClick={handleClick}>
      <Image src="/assets/google-logo.png" alt="Google Icon" width={20} height={20} />
      {content}
    </button>
  );
};

export default GoogleAuthButton;
