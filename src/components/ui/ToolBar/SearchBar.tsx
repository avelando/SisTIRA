'use client'

import React from 'react'
import { Search } from 'lucide-react'

import { SearchBarProps } from '@/interfaces/Activities'

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
}) => (
  <div className="relative flex-1 max-w-md">
    <Search
      size={20}
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
    />
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="
        w-full pl-10 pr-4 py-2
        border border-slate-300 rounded-lg
        focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50 focus:border-slate-900
        outline-none transition-colors
      "
    />
  </div>
)
