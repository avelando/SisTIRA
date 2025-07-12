'use client'

import React from 'react'
import { HelpCircle } from 'lucide-react'
import styles from '@/styles/ExamInfo.module.css'
import { ExamInfoProps } from '@/interfaces/ExamsProps'

export default function ExamInfo({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: ExamInfoProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HelpCircle className={styles.icon} />
        <h2 className={styles.heading}>Informações da Prova</h2>
      </div>
      <div className={styles.group}>
        <div>
          <label className={styles.label}>Título da Prova</label>
          <input
            value={title}
            onChange={e => onTitleChange(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Descrição</label>
          <textarea
            value={description}
            onChange={e => onDescriptionChange(e.target.value)}
            rows={4}
            className={styles.textarea}
          />
        </div>
      </div>
    </div>
  )
}
