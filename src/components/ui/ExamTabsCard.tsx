'use client'

import React from 'react'
import styles from '@/styles/ExamsTabsCard.module.css'

export type ExamTabKey = 'prova' | 'respostas' | 'configuracoes'

interface ExamTabsCardProps {
  active: ExamTabKey
  onChange: (next: ExamTabKey) => void
  responsesCount?: number
}

const tabs: { key: ExamTabKey; label: string; showCount?: boolean }[] = [
  { key: 'prova', label: 'Prova' },
  { key: 'respostas', label: 'Respostas', showCount: true },
  { key: 'configuracoes', label: 'Configurações' },
]

export default function ExamTabsCard({ active, onChange, responsesCount }: ExamTabsCardProps) {
  return (
    <div className={styles.card} role="tablist" aria-label="Gerenciar Prova">
      <div className={styles.tabRow}>
        {tabs.map(t => {
          const isActive = active === t.key
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={isActive ? styles.tabActive : styles.tab}
              onClick={() => onChange(t.key)}
            >
              <span>{t.label}</span>
              {t.showCount && typeof responsesCount === 'number' && (
                <span className={styles.badge}>{responsesCount}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
