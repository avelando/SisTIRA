import { Plus, HelpCircle } from 'lucide-react'
import CompactActionButton from './ActionButton'

interface EmptyQuestionsProps {
  onOpen: () => void
}

export default function EmptyQuestions({ onOpen }: EmptyQuestionsProps) {
  return (
    <div className="bg-gray-50 border-2 border-dashed rounded-xl py-6 px-6 text-center">
      <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">
        Nenhuma questão adicionada
      </h3>
      <div className="flex justify-center space-x-4">
        <CompactActionButton
          icon={<Plus size={16} />}
          title="Adicionar questão"
          onClick={onOpen}
        />
      </div>
    </div>
  )
}
