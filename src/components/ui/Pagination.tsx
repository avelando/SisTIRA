'use client'

import React from 'react'
import { PrevNextButtons } from '@/components/ui/PrevNextButton'
import { PaginationProps } from '@/interfaces/PaginationProps'
import styles from '@/styles/Pagination.module.css'

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  delta = 2,
}) => {
  const getPages = (): (number | '...')[] => {
    const range: number[] = []
    const pages: (number | '...')[] = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      pages.push(1, '...')
    } else {
      pages.push(1)
    }

    pages.push(...range)

    if (currentPage + delta < totalPages - 1) {
      pages.push('...', totalPages)
    } else if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  if (totalPages < 2) return null

  const pages = getPages()

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.info}>
          Página {currentPage} de {totalPages}
        </div>
        <div className={styles.controls}>
          <PrevNextButtons
            onPrev={() => onPageChange(Math.max(1, currentPage - 1))}
            onNext={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disablePrev={currentPage === 1}
            disableNext={currentPage === totalPages}
          />
          <div className={styles.pages}>
            {pages.map((p, idx) =>
              p === '...' ? (
                <span key={idx} className={styles.ellipsis}>
                  …
                </span>
              ) : (
                <button
                  key={idx}
                  onClick={() => onPageChange(p as number)}
                  className={
                    p === currentPage
                      ? `${styles.pageButton} ${styles.active}`
                      : styles.pageButton
                  }
                >
                  {p}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
