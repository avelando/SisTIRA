'use client'

import React from 'react'
import { FilterButtonProps } from '@/interfaces/Activities'
import { Filter } from 'lucide-react'
import styles from '@/styles/FilterButton.module.css'

export const FilterButton: React.FC<FilterButtonProps> = ({
  isOpen,
  onToggle,
  children,
}) => (
  <div className={styles.wrapper}>
    <button onClick={onToggle} className={styles.button}>
      <Filter size={16} />
      <span className={styles.label}>Filtros</span>
    </button>

    {isOpen && (
      <div className={styles.panel}>
        {children}
      </div>
    )}
  </div>
)
