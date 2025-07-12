'use client'

import React from 'react'
import { QuestionBankFilterPanelProps } from '@/interfaces/Activities'
import { ClearButton } from './ClearButton'
import { ApplyButton } from './ApplyButton'
import styles from '@/styles/QuestionBankFilterPanel.module.css'

export const QuestionBankFilterPanel: React.FC<
  Omit<QuestionBankFilterPanelProps, 'isOpen' | 'onToggle'>
> = ({ value, onChange, onClear, onApply, options }) => (
  <div className={styles.container}>
    <div className={styles.field}>
      <label htmlFor="discipline" className={styles.label}>
        Disciplina
      </label>
      <select
        id="discipline"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={styles.select}
      >
        <option value="">Todas</option>
        {options.map(d => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
    </div>

    <div className={styles.actions}>
      <ClearButton onClick={onClear} />
      <ApplyButton onClick={onApply} />
    </div>
  </div>
)
