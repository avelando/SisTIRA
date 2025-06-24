'use client'

import React from 'react'
import { ActionButtonProps } from '@/interfaces/Activities'

export const ActionButton: React.FC<ActionButtonProps> = ({ label, icon, onClick }) => (
  <button
    onClick={onClick}
    className="
      flex items-center gap-2 px-4 py-2
      bg-slate-900 text-white rounded-lg
      hover:bg-slate-800 transition-colors
      focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50
    "
  >
    {icon}
    <span>{label}</span>
  </button>
)
