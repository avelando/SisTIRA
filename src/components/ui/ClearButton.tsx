'use client'

import React from 'react'

import { ClearButtonProps } from '@/interfaces/ClearProps'

export const ClearButton: React.FC<ClearButtonProps> = ({
  onClick,
  label = 'Limpar',
}) => (
  <button
    onClick={onClick}
    className="
      flex-1 px-3 py-2 text-sm text-slate-600
      border border-slate-300 rounded-lg
      hover:bg-slate-50 transition-colors
      focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50
    "
  >
    {label}
  </button>
)
