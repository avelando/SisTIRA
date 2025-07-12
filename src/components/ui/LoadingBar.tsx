'use client'

import React from 'react'
import styles from '@/styles/LoadingBar.module.css'

interface LoadingBarProps {
  loading: boolean
}

export default function LoadingBar({ loading }: LoadingBarProps) {
  if (!loading) return null
  return <div className={styles.loadingBar} />
}
