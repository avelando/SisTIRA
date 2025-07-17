'use client'

import React from 'react'
import { HelpCircle, Plus } from 'lucide-react'
import { ActionButton } from './ActionButton'
import styles from '@/styles/EmptyQuestions.module.css'
import { EmptyQuestionsProps } from '@/interfaces/Activities'

export default function EmptyQuestions({ onOpen }: EmptyQuestionsProps) {
  return (
    <div className={styles.container}>
      <HelpCircle className={styles.icon} />
      <h3 className={styles.title}>Nenhuma questão adicionada</h3>
      <div className={styles.actions}>
        <ActionButton
          icon={<Plus size={16} />}
          title="Adicionar questão"
          onClick={onOpen}
        />
      </div>
    </div>
  )
}
