'use client'

import React from 'react'
import { ApplyButtonProps } from '@/interfaces/ClearProps'
import styles from '@/styles/ApplyButton.module.css'

export const ApplyButton: React.FC<ApplyButtonProps> = ({
  onClick,
  label = 'Aplicar',
}) => (
  <button onClick={onClick} className={styles.button}>
    {label}
  </button>
)
