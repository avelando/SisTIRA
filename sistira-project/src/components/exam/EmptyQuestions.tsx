import { Plus, Database, HelpCircle } from 'lucide-react'

interface EmptyQuestionsProps {
  onAddNew: () => void
  onOpenBank: () => void
}

export default function EmptyQuestions({ onAddNew, onOpenBank }: EmptyQuestionsProps) {
  return (
    <div className="bg-gray-50 border-2 border-dashed rounded-xl py-6 px-6 text-center">
      <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">
        Nenhuma questão adicionada
      </h3>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onAddNew}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Questão</span>
        </button>
        <button
          onClick={onOpenBank}
          className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
        >
          <Database className="w-4 h-4" />
          <span>Banco de Questões</span>
        </button>
      </div>
    </div>
  )
}
