'use client'

import React from 'react'
import { X } from 'lucide-react'
import { BaseModalProps } from '@/interfaces/BaseModal'

export const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  title,
  onClose,
  onSave,
  saveLabel = 'Salvar',
  saveLoading = false,
  disableSave = false,
  maxWidthClass = 'max-w-3xl',
  children,
}) => {
  if (!visible) return null

  return (
    <div
      className="
        fixed inset-0
        bg-black/50
        backdrop-filter backdrop-blur-3xl
        flex items-center justify-center p-4 z-50
      "
      onClick={onClose}
    >
      <div
        className={`
          bg-white rounded-xl w-full ${maxWidthClass}
          max-h-[90vh] flex flex-col shadow-lg
        `}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="
              p-2 text-slate-400 hover:text-slate-600
              hover:bg-slate-100 rounded-lg transition
              focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50
            "
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={disableSave || saveLoading}
            className={`
              px-6 py-2 rounded-lg text-white
              ${saveLoading
                ? 'bg-slate-700 cursor-wait'
                : 'bg-slate-900 hover:bg-slate-800'}
              ${disableSave ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {saveLoading ? 'Salvando...' : saveLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
