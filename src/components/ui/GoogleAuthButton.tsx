'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import styles from '@/styles/GoogleAuthButton.module.css';

interface GoogleAuthButtonProps {
  content: string;
  redirectUrl?: string;
  nextPath?: string;
  disabled?: boolean;
}

const DEFAULT_API_BASE =
  (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001/api/v1').replace(/\/+$/, '');

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  content,
  redirectUrl,
  nextPath,
  disabled = false,
}) => {
  const href = useMemo(() => {
    if (redirectUrl) return redirectUrl;

    const base = `${DEFAULT_API_BASE}/auth/google`;

    if (!nextPath) return base;

    const u = new URL(base);
    u.searchParams.set('next', nextPath);
    return u.toString();
  }, [redirectUrl, nextPath]);

  return (
    <a
      href={disabled ? undefined : href}
      onClick={(e) => disabled && e.preventDefault()}
      className={styles.googleBtn}
      aria-disabled={disabled}
    >
      <Image
        src="/assets/google-logo.png"
        alt="Google logo"
        width={20}
        height={20}
        className={styles.googleIcon}
      />
      {content}
    </a>
  );
};

export default GoogleAuthButton;
