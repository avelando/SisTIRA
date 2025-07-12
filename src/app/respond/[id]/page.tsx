'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import {
  getExamForResponse,
  getExamForResponseAuth,
  submitExamResponse,
} from '@/api/exams'
import type {
  ExamForResponse,
  QuestionForResponse,
  SubmitResponseDto,
  SubmitResponseResult,
} from '@/interfaces/ExamsProps'
import styles from '@/styles/RespondExamPage.module.css'

export default function RespondExamPage() {
  const params = useParams()
  const router = useRouter()
  const search = useSearchParams()

  const raw = params?.id
  const examId = Array.isArray(raw) ? raw[0] : raw ?? ''
  const accessCode = search.get('accessCode') ?? undefined

  const [exam, setExam] = useState<ExamForResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!examId) {
      router.push('/respond/enter-code')
      return
    }
    ;(async () => {
      setLoading(true)
      try {
        const ex = accessCode
          ? await getExamForResponse(examId, accessCode)
          : await getExamForResponseAuth(examId)
        setExam(ex)
      } catch {
        if (!accessCode) {
          router.replace(
            `/respond/enter-code?returnTo=${encodeURIComponent(examId)}`
          )
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [examId, accessCode, router])

  const handleChange = (q: QuestionForResponse, v: string) =>
    setAnswers(prev => ({ ...prev, [q.id]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!exam) return

    setSubmitting(true)
    const payload: SubmitResponseDto = {
      examId,
      accessCode,
      answers: exam.questions.map(q => ({
        questionId: q.id,
        alternativeId: q.questionType === 'OBJ' ? answers[q.id] : undefined,
        textResponse: q.questionType === 'SUB' ? answers[q.id] : undefined,
      })),
    }

    try {
      const result: SubmitResponseResult = await submitExamResponse(payload)
      router.push(`respond/responses/${encodeURIComponent(result.id)}`)
    } catch (err) {
      console.error(err)
      alert('Erro ao enviar respostas.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p>Carregando prova…</p>
  if (!exam) return null

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{exam.title}</h1>
        {exam.description && (
          <p className={styles.pageDescription}>{exam.description}</p>
        )}
      </header>

      {exam.questions.map((q, idx) => (
        <div key={q.id} className={styles.questionCard}>
          <p className={styles.questionText}>
            {idx + 1}. {q.text}
          </p>

          {q.questionType === 'OBJ' ? (
            <ul className={styles.radioList}>
              {q.alternatives?.map(a => (
                <li key={a.id} className={styles.radioOption}>
                  <label>
                    <input
                      type="radio"
                      name={q.id}
                      value={a.id}
                      checked={answers[q.id] === a.id}
                      onChange={() => handleChange(q, a.id)}
                      disabled={submitting}
                    />
                    <span>{a.content}</span>
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <textarea
              rows={4}
              className={styles.textResponse}
              value={answers[q.id] || ''}
              onChange={e => handleChange(q, e.target.value)}
              disabled={submitting}
              placeholder="Sua resposta…"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={submitting}
        className={styles.submitButton}
      >
        {submitting ? 'Enviando…' : 'Enviar Respostas'}
      </button>
    </form>
  )
}
