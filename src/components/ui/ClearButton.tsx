'use client'

import React from 'react'
import { ClearButtonProps } from '@/interfaces/ClearProps'
import styles from '@/styles/ClearButton.module.css'

export const ClearButton: React.FC<ClearButtonProps> = ({
  onClick,
  label = 'Limpar',
}) => (
  <button onClick={onClick} className={styles.button}>
    {label}
  </button>
)
