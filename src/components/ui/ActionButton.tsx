'use client'

import React from 'react'
import { ActionButtonProps } from '@/interfaces/Activities'
import styles from '@/styles/ActionButton.module.css'

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onClick,
}) => (
  <button onClick={onClick} className={styles.button}>
    {icon}
    <span>{label}</span>
  </button>
)
