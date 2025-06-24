'use client'

import React from 'react'
import { Filter } from 'lucide-react'
import { FilterButtonProps } from '@/interfaces/Activities'

export const FilterButton: React.FC<FilterButtonProps> = ({
  isOpen,
  onToggle,
  children,
}) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="
        flex items-center gap-2 px-4 py-2
        border border-slate-300 rounded-lg
        hover:bg-slate-50 transition-colors
        focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50
      "
    >
      <Filter size={16} />
      <span className="hidden sm:inline">Filtros</span>
    </button>

    {isOpen && (
      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 p-4 z-10">
        {children}
      </div>
    )}
  </div>
)
