'use client'

import React from 'react'
import { ActionButtonProps } from '@/interfaces/Activities'

export default function ActionButton({
  icon,
  title,
  description,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        flex items-start gap-4 p-4 bg-white border border-slate-200
        rounded-lg hover:shadow-md hover:border-slate-300
        transition-all duration-200 text-left
        focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50
      "
    >
      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </button>
  )
}
