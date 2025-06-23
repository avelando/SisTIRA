import React from 'react'
import { Plus, Database } from 'lucide-react'

interface SidebarActionsProps {
  visible: boolean
  onAddQuestion: () => void
  onOpenBank: () => void
}

export default function SidebarActions({
  visible,
  onAddQuestion,
  onOpenBank,
}: SidebarActionsProps) {
  if (!visible) return null

  return (
    <div
      className="
        fixed left-4 top-1/2 transform -translate-y-1/2
        flex flex-col space-y-3 z-20
      "
    >
      <button
        onClick={onAddQuestion}
        className="
          p-3 rounded-lg
          bg-blue-100 text-blue-600
          shadow hover:bg-blue-200
          transition-colors
        "
        aria-label="Nova Questão"
      >
        <Plus size={20} />
      </button>

      <button
        onClick={onOpenBank}
        className="
          p-3 rounded-lg
          bg-green-100 text-green-600
          shadow hover:bg-green-200
          transition-colors
        "
        aria-label="Banco de Questões"
      >
        <Database size={20} />
      </button>
    </div>
  )
}
