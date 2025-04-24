import React from 'react';
import styles from '@/styles/ui/GoogleAuthButton.module.css';
import Image from 'next/image'
import { ButtonProps } from '@/interfaces/ButtonProps';

const GoogleAuthButton: React.FC<ButtonProps> = ({ content }) => {
  return (
    <button className={styles.googleButton}>
      <Image src={'/assets/google-logo.png'} alt={'Google Icon'} width={20} height={20} />
      {content}
    </button>
  );
};

export default GoogleAuthButton;
