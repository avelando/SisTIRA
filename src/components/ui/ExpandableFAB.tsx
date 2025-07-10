'use client'

import { useState } from 'react'
import { Plus, Edit } from 'lucide-react'

interface ExpandableFABProps {
  onAddExisting: () => void
  onCreateNew: () => void
}

export default function ExpandableFAB({
  onAddExisting,
  onCreateNew,
}: ExpandableFABProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center z-50">
      <div
        className={`
          flex flex-col items-center space-y-2 
          ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          pointer-events-${open ? 'auto' : 'none'}
          transition-all duration-300 ease-out
        `}
      >
        <button
          onClick={() => { setOpen(false); onCreateNew() }}
          className="
            group relative
            w-12 h-12
            bg-slate-900 hover:bg-slate-700
            text-white
            rounded-full shadow-lg
            flex items-center justify-center
            transition-all duration-300 ease-out
          "
        >
          <Edit size={20} />
          <span className="
            absolute right-full top-1/2 transform -translate-y-1/2
            bg-slate-900 text-white text-xs font-medium
            px-2 py-1 rounded
            opacity-0 translate-x-2
            group-hover:opacity-100 group-hover:translate-x-0
            pointer-events-none whitespace-nowrap
            transition-all duration-300 ease-out
            mr-2
          ">
            Criar questão
          </span>
        </button>

        <button
          onClick={() => { setOpen(false); onAddExisting() }}
          className="
            group relative
            w-12 h-12
            bg-slate-900 hover:bg-slate-700
            text-white
            rounded-full shadow-lg
            flex items-center justify-center
            transition-all duration-300 ease-out
          "
        >
          <Plus size={20} />
          <span className="
            absolute right-full top-1/2 transform -translate-y-1/2
            bg-slate-900 text-white text-xs font-medium
            px-2 py-1 rounded
            opacity-0 translate-x-2
            group-hover:opacity-100 group-hover:translate-x-0
            pointer-events-none whitespace-nowrap
            transition-all duration-300 ease-out
            mr-2
          ">
            Adicionar questão
          </span>
        </button>
      </div>

      <button
        onClick={() => setOpen(o => !o)}
        className="
          mt-2
          w-14 h-14
          bg-slate-900 hover:bg-slate-700 text-white
          rounded-full shadow-xl
          flex items-center justify-center
          transition-transform duration-300 ease-out
        "
      >
        <Plus
          size={28}
          className={open ? 'transform rotate-45 transition-transform duration-300 ease-out' : ''}
        />
      </button>
    </div>
  )
}
