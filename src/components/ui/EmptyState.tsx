'use client'

import React from 'react'
import { EmptyStateProps } from '@/interfaces/EmptyStateProps'

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}) => (
  <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 mb-6">{message}</p>
    <button
      onClick={onAction}
      className="
        bg-slate-900 text-white px-6 py-2 rounded-lg font-medium
        hover:bg-slate-800 transition-colors
        focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50
      "
    >
      {actionLabel}
    </button>
  </div>
)
