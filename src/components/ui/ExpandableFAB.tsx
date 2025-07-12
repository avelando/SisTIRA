'use client'

import React, { useState } from 'react'
import { Plus, Edit } from 'lucide-react'
import styles from '@/styles/ExpandableFAB.module.css'

interface ExpandableFABProps {
  onAddExisting: () => void
  onCreateNew: () => void
}

export default function ExpandableFAB({ onAddExisting, onCreateNew }: ExpandableFABProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <div className={`${styles.actions} ${open ? styles.open : ''}`}>
        <button
          onClick={() => { setOpen(false); onCreateNew() }}
          className={styles.fabOption}
        >
          <Edit size={20} />
          <span className={styles.tooltip}>Criar questão</span>
        </button>

        <button
          onClick={() => { setOpen(false); onAddExisting() }}
          className={styles.fabOption}
        >
          <Plus size={20} />
          <span className={styles.tooltip}>Adicionar questão</span>
        </button>
      </div>

      <button
        onClick={() => setOpen(o => !o)}
        className={styles.fabMain}
      >
        <Plus
          size={28}
          className={`${styles.mainIcon} ${open ? styles.rotated : ''}`}
        />
      </button>
    </div>
  )
}
