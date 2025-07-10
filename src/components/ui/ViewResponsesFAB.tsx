'use client'

import { ClipboardCheck } from 'lucide-react'

interface ViewResponsesFABProps {
  onClick: () => void
}

export default function ViewResponsesFAB({ onClick }: ViewResponsesFABProps) {
  return (
    <div className="fixed bottom-6 right-44 z-50 flex items-center">
      <button
        onClick={onClick}
        className="
          w-14 h-14 bg-slate-900 hover:bg-slate-700 text-white rounded-full shadow-xl
          flex items-center justify-center transition duration-200 ease-out
        "
      >
        <ClipboardCheck size={24} />
      </button>
    </div>
  )
}
