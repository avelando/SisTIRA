'use client'

import React from 'react'
import { FloatingActionsProps } from '@/interfaces/FloatingActionsProps'

export default function FloatingActions({ onOpen }: FloatingActionsProps) {
  return (
    <div className="fixed top-24 right-6 flex flex-col gap-3 z-50">
      <button
        onClick={() => onOpen('existente')}
        className="
          px-4 py-2 
          bg-blue-600 text-white 
          rounded-md 
          hover:bg-blue-700 
          transition-colors 
          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50
        "
      >
        + Questões Existentes
      </button>
    </div>
  )
}
