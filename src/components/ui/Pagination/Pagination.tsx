'use client'

import React from 'react'
import { PrevNextButtons } from '@/components/ui/Pagination/PrevNextButton'
import { PaginationProps } from '@/interfaces/PaginationProps'

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
    <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Página {currentPage} de {totalPages}
        </div>

        <div className="flex items-center gap-1">
          <PrevNextButtons
            onPrev={() => onPageChange(Math.max(1, currentPage - 1))}
            onNext={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disablePrev={currentPage === 1}
            disableNext={currentPage === totalPages}
          />

          {pages.map((p, idx) =>
            p === '...' ? (
              <span key={idx} className="px-3 py-2 text-slate-400">
                …
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => onPageChange(p)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50
                  ${p === currentPage
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 bg-white border border-slate-300 hover:bg-slate-50'}
                `}
              >
                {p}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}
