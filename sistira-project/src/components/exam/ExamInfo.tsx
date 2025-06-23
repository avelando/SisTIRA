import { HelpCircle } from 'lucide-react'

interface ExamInfoProps {
  title: string
  description: string
  onTitleChange: (v: string) => void
  onDescriptionChange: (v: string) => void
}

export default function ExamInfo({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: ExamInfoProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-blue-600 bg-blue-100 rounded-full p-1" />
        <h2 className="text-xl font-semibold text-gray-800">
          Informações da Prova
        </h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título da Prova
          </label>
          <input
            value={title}
            onChange={e => onTitleChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            value={description}
            onChange={e => onDescriptionChange(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      </div>
    </div>
  )
}
