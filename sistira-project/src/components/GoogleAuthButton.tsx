import React from 'react';
import styles from '@/styles/GoogleAuthButton.module.css';
import Image from 'next/image'

const GoogleAuthButton: React.FC<ButtonProps> = ({ content }: ButtonProps) => {
  return (
    <button className={styles.googleButton}>
      <Image src={'/google-logo.png'} alt={'Google Icon'} width={20} height={20} />
      {content}
    </button>
  );
};

export default GoogleAuthButton;
