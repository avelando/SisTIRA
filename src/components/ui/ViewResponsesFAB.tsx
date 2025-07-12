'use client'

import React from 'react'
import { ClipboardCheck } from 'lucide-react'
import styles from '@/styles/ViewResponsesFAB.module.css'

interface ViewResponsesFABProps {
  onClick: () => void
}

export default function ViewResponsesFAB({ onClick }: ViewResponsesFABProps) {
  return (
    <div className={styles.container}>
      <button onClick={onClick} className={styles.button}>
        <ClipboardCheck size={24} />
      </button>
    </div>
  )
}
