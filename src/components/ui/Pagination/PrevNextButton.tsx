'use client'

import React from 'react'
import { PrevNextButtonsProps } from '@/interfaces/PrevNextButtonProps'

export const PrevNextButtons: React.FC<PrevNextButtonsProps> = ({
  onPrev,
  onNext,
  disablePrev = false,
  disableNext = false,
}) => (
  <div className="flex items-center gap-2">
    <button
      onClick={onPrev}
      disabled={disablePrev}
      className="
        px-3 py-2 text-sm font-medium text-slate-600
        bg-white border border-slate-300 rounded-lg
        hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50
      "
    >
      Anterior
    </button>
    <button
      onClick={onNext}
      disabled={disableNext}
      className="
        px-3 py-2 text-sm font-medium text-slate-600
        bg-white border border-slate-300 rounded-lg
        hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50
      "
    >
      Próxima
    </button>
  </div>
)
