import { Plus, HelpCircle } from 'lucide-react'
import CompactActionButton from './ActionButton'

interface EmptyQuestionsProps {
  onAddNew: () => void
  onOpenBank?: () => void
}

export default function EmptyQuestions({ onAddNew }: EmptyQuestionsProps) {

  const handleAddNew = () => {
    onAddNew()
  }

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
          onClick={handleAddNew}
        />

        {/* <CompactActionButton
          icon={<Plus size={16} />}
          title="Criar questão"
          onClick={handleClick}
        /> */}

        {/* <button
          onClick={onAddNew}
          className="bg-blue-100 text-blue-800 px-6 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Questão</span>
        </button>
        <button
          onClick={onAddNew}
          className="bg-purple-100 text-purple-800 px-6 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Questão</span>
        </button>
        <button
          onClick={onOpenBank}
          className="bg-green-100 text-green-800 px-6 py-2 rounded-lg flex items-center space-x-2"
        >
          <Database className="w-4 h-4" />
          <span>Banco de Questões</span>
        </button> */}
      </div>
    </div>
  )
}
