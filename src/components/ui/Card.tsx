import React from 'react'
import { CardProps } from '@/interfaces/CardProps'

const colorClasses = {
  yellow: {
    bg: 'bg-yellow-50',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    border: 'border-yellow-200',
    hoverBg: 'hover:bg-yellow-100',
  },
  pink: {
    bg: 'bg-pink-50',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    border: 'border-pink-200',
    hoverBg: 'hover:bg-pink-100',
  },
  green: {
    bg: 'bg-green-50',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    border: 'border-green-200',
    hoverBg: 'hover:bg-green-100',
  },
}

export default function Card({ title, quant, icon, bgColor }: CardProps) {
  const colors = colorClasses[bgColor as keyof typeof colorClasses]

  return (
    <div
      className={`
        ${colors.bg} ${colors.border} ${colors.hoverBg}
        border rounded-xl p-4 pl-6 pr-6
        transition-all duration-200 cursor-pointer
        hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1
        focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-slate-600 text-sm font-medium mb-2">{title}</h3>
          <span className="text-slate-900 text-3xl font-bold">{quant}</span>
        </div>
        <div
          className={`
            ${colors.iconBg} ${colors.iconColor}
            w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
