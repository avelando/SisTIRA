'use client'

import React from 'react'

export interface BaseModalProps {
  visible: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
  actions?: React.ReactNode
}

export default function BaseModal({
  visible,
  title,
  onClose,
  children,
  actions,
}: BaseModalProps) {
  if (!visible) return null

  return (
    <div
      className="
        fixed inset-0 
        bg-black/50
        flex items-center justify-center
        z-[9999]
      "
    >
      <div
        className="
          w-full max-w-lg max-h-[80vh]
          bg-white rounded-xl overflow-hidden
          shadow-2xl
          flex flex-col
        "
      >
        <header
          className="
            flex items-center justify-between
            bg-[#133856] text-white
            px-6 py-4
          "
        >
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="
              text-2xl leading-none
              hover:text-gray-300
              focus:outline-none
            "
          >
            &times;
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>

        {actions && (
          <footer className="flex justify-end gap-4 px-6 py-4 bg-gray-50">
            {actions}
          </footer>
        )}
      </div>
    </div>
  )
}
