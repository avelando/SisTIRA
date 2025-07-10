'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface CompactActionButtonProps {
  icon: React.ReactElement<LucideIcon>
  title: string
  onClick: () => void
}

export default function CompactActionButton({ icon, title, onClick }: CompactActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-3 px-3 py-2 border border-slate-200
        rounded-lg hover:shadow-sm hover:border-slate-300
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50
      "
    >
      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="font-medium text-slate-900 leading-tight">{title}</span>
    </button>
  )
}
