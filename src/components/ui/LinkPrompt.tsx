'use client'

import React from 'react'
import styles from '@/styles/LinkPrompt.module.css'

interface LinkPromptProps {
  prompt: string
  linkText: string
  onClick: () => void
  className?: string
}

const LinkPrompt: React.FC<LinkPromptProps> = ({ prompt, linkText, onClick, className }) => (
  <p className={`${styles.wrapper} ${className ?? ''}`}>
    {prompt}{' '}
    <button type="button" onClick={onClick} className={styles.linkBtn}>
      {linkText}
    </button>
  </p>
)

export default LinkPrompt
