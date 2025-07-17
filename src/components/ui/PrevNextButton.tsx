'use client'

import React from 'react'
import { PrevNextButtonsProps } from '@/interfaces/PrevNextButtonProps'
import styles from '@/styles/PrevNextButtons.module.css'

export const PrevNextButtons: React.FC<PrevNextButtonsProps> = ({
  onPrev,
  onNext,
  disablePrev = false,
  disableNext = false,
}) => (
  <div className={styles.container}>
    <button
      onClick={onPrev}
      disabled={disablePrev}
      className={`${styles.button} ${disablePrev ? styles.disabled : ''}`}
    >
      Anterior
    </button>
    <button
      onClick={onNext}
      disabled={disableNext}
      className={`${styles.button} ${disableNext ? styles.disabled : ''}`}
    >
      Próxima
    </button>
  </div>
)
