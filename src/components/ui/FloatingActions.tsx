'use client'

import React from 'react'
import { FloatingActionsProps } from '@/interfaces/FloatingActionsProps'
import styles from '@/styles/FloatingActions.module.css'

export default function FloatingActions({ onOpen }: FloatingActionsProps) {
  return (
    <div className={styles.container}>
      <button
        onClick={() => onOpen('existente')}
        className={styles.button}
      >
        + Questões Existentes
      </button>
    </div>
  )
}
