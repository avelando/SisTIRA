'use client'

import React from 'react'
import { Search } from 'lucide-react'
import { SearchBarProps } from '@/interfaces/Activities'
import styles from '@/styles/SearchBar.module.css'

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
}) => (
  <div className={styles.wrapper}>
    <Search size={20} className={styles.icon} />
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={styles.input}
    />
  </div>
)
