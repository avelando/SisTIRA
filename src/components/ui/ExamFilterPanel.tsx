'use client'

import React from 'react'
import { StatusFilterPanelProps } from '@/interfaces/Activities'
import { ClearButton } from '@/components/ui/ClearButton'
import { ApplyButton } from '@/components/ui/ApplyButton'
import styles from '@/styles/StatusFilterPanel.module.css'

export const StatusFilterPanel: React.FC<StatusFilterPanelProps> = ({
  value,
  onChange,
  onClear,
  onApply,
}) => (
  <div className={styles.container}>
    <div className={styles.field}>
      <label htmlFor="status" className={styles.label}>
        Status
      </label>
      <select
        id="status"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={styles.select}
      >
        <option value="">Todos</option>
        <option value="draft">Rascunho</option>
        <option value="published">Publicada</option>
        <option value="archived">Arquivada</option>
      </select>
    </div>

    <div className={styles.actions}>
      <ClearButton onClick={onClear} />
      <ApplyButton onClick={onApply} />
    </div>
  </div>
)
