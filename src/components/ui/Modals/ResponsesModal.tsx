'use client'

import { useEffect, useState } from 'react'
import { getExamResponses } from '@/api/exams'
import type { ExamResponseResult } from '@/interfaces/ExamsProps'
import { X } from 'lucide-react'

interface ResponsesModalProps {
  examId: string
  visible: boolean
  onClose: () => void
}

export default function ResponsesModal({ examId, visible, onClose }: ResponsesModalProps) {
  const [responses, setResponses] = useState<ExamResponseResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!visible) return

    setLoading(true)
    ;(async () => {
      try {
        const data = await getExamResponses(examId)
        setResponses(data)
      } catch (err) {
        console.error(err)
        alert('Erro ao carregar respostas.')
      } finally {
        setLoading(false)
      }
    })()
  }, [examId, visible])

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white max-w-3xl w-full rounded-lg shadow-xl overflow-y-auto max-h-[90vh] p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-800">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Respostas da Prova</h2>

        {loading ? (
          <p>Carregando respostas...</p>
        ) : responses.length === 0 ? (
          <p>Nenhuma resposta enviada ainda.</p>
        ) : (
          responses.map(resp => (
            <div key={resp.id} className="mb-4 border-b pb-3">
              <p>
                <strong>Usuário:</strong> {resp.user.firstName} {resp.user.lastName} ({resp.user.username})
              </p>
              <p>
                <strong>Enviado em:</strong> {new Date(resp.createdAt).toLocaleString()}
              </p>

              <ul className="mt-2">
                {resp.answers.map(answer => (
                  <li key={answer.id} className="bg-gray-50 rounded p-2 my-2">
                    <p>
                      <strong>Questão:</strong> {answer.question.text}
                    </p>
                    {answer.question.questionType === 'OBJ' && (
                      <p>
                        <strong>Resposta:</strong> {answer.alternative?.content || '–'}
                      </p>
                    )}
                    {answer.question.questionType === 'SUB' && (
                      <p>
                        <strong>Resposta subjetiva:</strong> {answer.subjectiveText}
                      </p>
                    )}
                    <p>
                      <strong>Nota da IA:</strong> {answer.score ?? '–'}
                    </p>
                    <p>
                      <strong>Feedback:</strong> {answer.feedback ?? '–'}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
