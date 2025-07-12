'use client'

import React, { useEffect, useState } from 'react'
import { getExamResponses } from '@/api/exams'
import type { ExamResponseResult } from '@/interfaces/ExamsProps'
import { X } from 'lucide-react'
import styles from '@/styles/ResponsesModal.module.css'

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
      } catch {
        alert('Erro ao carregar respostas.')
      } finally {
        setLoading(false)
      }
    })()
  }, [examId, visible])

  if (!visible) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          <X size={24} />
        </button>
        <h2 className={styles.title}>Respostas da Prova</h2>
        {loading ? (
          <p className={styles.message}>Carregando respostas...</p>
        ) : responses.length === 0 ? (
          <p className={styles.message}>Nenhuma resposta enviada ainda.</p>
        ) : (
          <div className={styles.list}>
            {responses.map(resp => (
              <div key={resp.id} className={styles.responseItem}>
                <p><strong>Usuário:</strong> {resp.user.firstName} {resp.user.lastName} ({resp.user.username})</p>
                <p><strong>Enviado em:</strong> {new Date(resp.createdAt).toLocaleString()}</p>
                <ul className={styles.answersList}>
                  {resp.answers.map(answer => (
                    <li key={answer.id} className={styles.answerItem}>
                      <p><strong>Questão:</strong> {answer.question.text}</p>
                      {answer.question.questionType === 'OBJ' ? (
                        <p><strong>Resposta:</strong> {answer.alternative?.content || '–'}</p>
                      ) : (
                        <p><strong>Resposta subjetiva:</strong> {answer.subjectiveText}</p>
                      )}
                      <p><strong>Nota da IA:</strong> {answer.score ?? '–'}</p>
                      <p><strong>Feedback:</strong> {answer.feedback ?? '–'}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
