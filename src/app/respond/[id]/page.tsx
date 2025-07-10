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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">{exam.title}</h1>
        {exam.description && <p>{exam.description}</p>}
      </header>
      {exam.questions.map((q, idx) => (
        <div key={q.id} className="p-4 bg-white rounded shadow">
          <p className="font-medium mb-2">{idx + 1}. {q.text}</p>
          {q.questionType === 'OBJ' ? (
            <ul className="space-y-2">
              {q.alternatives?.map(a => (
                <li key={a.id}>
                  <label className="flex items-center gap-2">
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
              value={answers[q.id] || ''}
              onChange={e => handleChange(q, e.target.value)}
              disabled={submitting}
              placeholder="Sua resposta…"
              className="w-full border px-3 py-2 rounded"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
      >
        {submitting ? 'Enviando…' : 'Enviar Respostas'}
      </button>
    </form>
  )
}
