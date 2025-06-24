'use client'

import React from 'react'

import { ApplyButtonProps } from '@/interfaces/ClearProps'

export const ApplyButton: React.FC<ApplyButtonProps> = ({
  onClick,
  label = 'Aplicar',
}) => (
  <button
    onClick={onClick}
    className="
      flex-1 px-3 py-2 text-sm bg-slate-900 text-white
      rounded-lg hover:bg-slate-800 transition-colors
      focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50
    "
  >
    {label}
  </button>
)
