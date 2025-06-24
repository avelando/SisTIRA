'use client'

import React from 'react'
import { QuestionBankFilterPanelProps } from '@/interfaces/Activities'
import { ClearButton } from '../ClearButton'
import { ApplyButton } from '../ApplyButton'

export const QuestionBankFilterPanel: React.FC<
  Omit<QuestionBankFilterPanelProps, 'isOpen' | 'onToggle'>
> = ({
  value,
  onChange,
  onClear,
  onApply,
  options,
}) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Disciplina
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none transition-colors"
      >
        <option value="">Todas</option>
        {options.map(d => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
    </div>
    <div className="flex gap-2 pt-2">
      <ClearButton onClick={onClear} />
      <ApplyButton onClick={onApply} />
    </div>
  </div>
)
