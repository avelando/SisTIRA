'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import {
  getExamForResponse,
  submitExamResponse,
  getMyResponseStatus,
} from '@/api/exam-responses'
import type {
  ExamForResponse,
  QuestionForResponse,
  SubmitResponseDto,
  SubmitResponseResult,
} from '@/interfaces/ExamsProps'
import { isSubjectiveType, isObjectiveType } from '@/utils/questionType'
import styles from '@/styles/RespondExamPage.module.css'

type MyStatus = {
  hasResponded: boolean
  latestResponseId: string | null
  allowMultipleResponses: boolean
}

export default function RespondExamPage() {
  const params = useParams()
  const router = useRouter()
  const search = useSearchParams()

  const raw = params?.id
  const identifier = Array.isArray(raw) ? raw[0] : raw ?? ''
  const accessCode = search.get('accessCode') ?? undefined

  const [status, setStatus] = useState<MyStatus | null>(null)
  const [showGate, setShowGate] = useState(false)

  const [exam, setExam] = useState<ExamForResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const effectKey = `${identifier}|${accessCode ?? ''}`
  const ranKeyRef = useRef<string | null>(null)

  useEffect(() => {
    if (!identifier) {
      router.replace('/respond/enter-code')
      return
    }

    if (ranKeyRef.current === effectKey) return
    ranKeyRef.current = effectKey

    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const ex = await getExamForResponse(identifier, accessCode)
        if (cancelled) return
        setExam(ex)

        const s = await getMyResponseStatus(ex.examId)
        if (cancelled) return
        setStatus(s)

        if (s.hasResponded && !s.allowMultipleResponses && s.latestResponseId) {
          router.replace(`/respond/respond/responses/${encodeURIComponent(s.latestResponseId)}`)
          return
        }
        if (s.hasResponded && s.allowMultipleResponses) {
          setShowGate(true)
          setLoading(false)
          return
        }

        setLoading(false)
      } catch (e: any) {
        if (cancelled) return
        const st = e?.status ?? e?.response?.status

        if (st === 401) {
          router.replace('/login')
          return
        }

        if (st === 403 || st === 404) {
          router.replace(`/respond/enter-code?returnTo=${encodeURIComponent(identifier)}`)
          return
        }

        console.error(e)
        router.replace(`/respond/enter-code?returnTo=${encodeURIComponent(identifier)}`)
      }
    })()

    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectKey, router])

  const handleSeeFeedback = () => {
    if (status?.latestResponseId) {
      router.push(`/respond/respond/responses/${encodeURIComponent(status.latestResponseId)}`)
    }
  }

  const handleRetake = async () => {
    setShowGate(false)
  }

  const handleChange = (q: QuestionForResponse, v: string) =>
    setAnswers(prev => ({ ...prev, [q.id]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!exam) return

    setSubmitting(true)
    const payload: SubmitResponseDto = {
      examId: exam.examId,
      accessCode,
      answers: exam.questions.map(q => ({
        questionId: q.id,
        textResponse: isSubjectiveType(q.questionType) ? (answers[q.id] || '') : undefined,
        alternativeId: isObjectiveType(q.questionType) ? answers[q.id] : undefined,
      })),
    }

    try {
      const result: SubmitResponseResult = await submitExamResponse(payload)
      router.push(`/respond/respond/responses/${encodeURIComponent(result.id)}`)
    } catch (err) {
      console.error(err)
      alert('Erro ao enviar respostas.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p>Carregando prova…</p>

  if (showGate && status) {
    return (
      <section className={styles.gateCard}>
        <h1 className={styles.pageTitle}>Você já respondeu esta prova</h1>
        <p className={styles.pageDescription}>
          O professor permite novas tentativas. Você pode visualizar seu feedback anterior
          ou refazer a prova (a tentativa anterior será substituída).
        </p>
        <div className={styles.gateActions}>
          <button className={styles.secondaryBtn} onClick={handleSeeFeedback} disabled={!status.latestResponseId}>
            Ver meu feedback
          </button>
          <button className={styles.primaryBtn} onClick={handleRetake}>
            Responder novamente
          </button>
        </div>
      </section>
    )
  }

  if (!exam) return null

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{exam.title}</h1>
        {exam.description && <p className={styles.pageDescription}>{exam.description}</p>}
      </header>

      {exam.questions.map((q, idx) => {
        const obj = isObjectiveType(q.questionType)
        return (
          <div key={q.id} className={styles.questionCard}>
            <p className={styles.questionText}>
              {idx + 1}. {q.text}
            </p>

            {obj ? (
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
        )
      })}

      <button type="submit" disabled={submitting} className={styles.submitButton}>
        {submitting ? 'Enviando…' : 'Enviar Respostas'}
      </button>
    </form>
  )
}
