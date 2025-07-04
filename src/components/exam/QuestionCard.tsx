import { Edit3, Trash2 } from 'lucide-react'
import { Question } from '@/interfaces/QuestionProps'

interface QuestionCardProps {
  question: Question
  index: number
  onRemove: (id: string) => void
  onEdit?: (id: string) => void
}

export default function QuestionCard({
  question: q,
  index,
  onRemove,
  onEdit,
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-6 px-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600">{index + 1}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Questão {index + 1}
          </h3>
          <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
            {q.questionType === 'OBJ' ? 'Múltipla Escolha' : 'Dissertativa'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {onEdit && (
            <button onClick={() => onEdit(q.id)} className="p-1 hover:text-blue-600">
              <Edit3 />
            </button>
          )}
          <button onClick={() => onRemove(q.id)} className="p-1 hover:text-red-600">
            <Trash2 />
          </button>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{q.text}</p>
      {q.questionType === 'OBJ' && q.alternatives && (
        <ul className="space-y-2">
          {q.alternatives.map((opt, i) => (
            <li key={i} className="flex items-center space-x-2">
              <div className="w-6 h-6 border rounded-full flex items-center justify-center">
                <span className="text-xs">{String.fromCharCode(65 + i)}</span>
              </div>
              <span>{opt.content}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
