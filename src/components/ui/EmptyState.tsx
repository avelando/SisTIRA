'use client'

import React from 'react'
import { EmptyStateProps } from '@/interfaces/EmptyStateProps'
import styles from '@/styles/EmptyState.module.css'

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}) => (
  <div className={styles.container}>
    <div className={styles.iconWrapper}>{icon}</div>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.message}>{message}</p>
    <button onClick={onAction} className={styles.button}>
      {actionLabel}
    </button>
  </div>
)
