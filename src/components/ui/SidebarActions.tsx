'use client'

import React from 'react'
import { Plus, Database } from 'lucide-react'
import styles from '@/styles/SidebarActions.module.css'
import { SidebarActionsProps } from '@/interfaces/Activities'

export default function SidebarActions({
  visible,
  onAddQuestion,
  onOpenBank,
}: SidebarActionsProps) {
  if (!visible) return null

  return (
    <div className={styles.container}>
      <button
        onClick={onAddQuestion}
        className={styles.buttonAdd}
        aria-label="Nova Questão"
      >
        <Plus size={20} />
      </button>

      <button
        onClick={onOpenBank}
        className={styles.buttonBank}
        aria-label="Banco de Questões"
      >
        <Database size={20} />
      </button>
    </div>
  )
}
