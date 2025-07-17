'use client'

import React from 'react'
import styles from '@/styles/GoogleAuthButton.module.css'
import Image from 'next/image'

interface GoogleAuthButtonProps {
  content: string
  redirectUrl?: string
  disabled?: boolean
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  content,
  redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
  disabled = false,
}) => {
  const handleClick = () => {
    if (disabled) return
    window.location.href = redirectUrl
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={styles.googleBtn}
    >
      <Image
        src="/assets/google-logo.png"
        alt="Google logo"
        width={20}
        height={20}
        className={styles.googleIcon}
      />
      {content}
    </button>
  )
}

export default GoogleAuthButton
