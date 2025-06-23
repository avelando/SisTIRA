import { Save, X } from 'lucide-react'
import { Question } from '@/interfaces/QuestionProps'

interface NewQuestionModalProps {
  visible: boolean
  question: Partial<Question>
  onChangeQuestion: (q: Partial<Question>) => void
  onAdd: () => void
  onClose: () => void
  onUpdateOption: (idx: number, value: string) => void
}

export default function NewQuestionModal({
  visible,
  question,
  onChangeQuestion,
  onAdd,
  onClose,
  onUpdateOption,
}: NewQuestionModalProps) {
  if (!visible) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Nova Questão</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block mb-2">Enunciado</label>
            <textarea
              value={question.text}
              onChange={e => onChangeQuestion({ ...question, text: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg resize-none"
            />
          </div>
          {question.questionType === 'OBJ' && (
            <div>
              <label className="block mb-2">Alternativas</label>
              <div className="space-y-3">
                {question.alternatives!.map((_, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-8 h-8 border rounded-full flex items-center justify-center">
                      <span className="text-xs">{String.fromCharCode(65 + idx)}</span>
                    </div>
                    <input
                      type="text"
                      value={question.alternatives![idx].content}
                      onChange={e => onUpdateOption(idx, e.target.value)}
                      placeholder={`Alternativa ${String.fromCharCode(65 + idx)}`}
                      className="flex-1 px-4 py-2 border rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-4 p-6 border-t">
          <button onClick={onClose} className="px-6 py-2 text-gray-600">
            Cancelar
          </button>
          <button onClick={onAdd} className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  )
}
