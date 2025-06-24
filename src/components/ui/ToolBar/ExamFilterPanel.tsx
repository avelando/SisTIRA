'use client'

import React from 'react'
import { StatusFilterPanelProps } from '@/interfaces/Activities'
import { ClearButton } from '@/components/ui/ClearButton'
import { ApplyButton } from '@/components/ui/ApplyButton'

export const StatusFilterPanel: React.FC<StatusFilterPanelProps> = ({
  value,
  onChange,
  onClear,
  onApply,
}) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Status
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="
          w-full px-3 py-2 border border-slate-300 rounded-lg
          focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50
          focus:border-slate-900 outline-none
        "
      >
        <option value="">Todos</option>
        <option value="draft">Rascunho</option>
        <option value="published">Publicada</option>
        <option value="archived">Arquivada</option>
      </select>
    </div>

    <div className="flex gap-2 pt-2">
      <ClearButton onClick={onClear} />
      <ApplyButton onClick={onApply} />
    </div>
  </div>
)
