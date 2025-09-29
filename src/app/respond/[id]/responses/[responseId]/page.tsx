'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getResponseResult } from '@/api/exam-responses'
import styles from '@/styles/FeedbackPage.module.css'

type AnswerDTO = {
  id: string
  question: { text: string; questionType: 'OBJ' | 'SUB' }
  alternative?: { content: string } | null
  subjectiveText?: string | null
  score?: number | null
  feedback?: string | null
  teacherScore?: number | null
  teacherFeedback?: string | null
}

type ResponseDTO = {
  id: string
  examId: string
  userId: string
  createdAt: string
  answers: AnswerDTO[]
}

export default function FeedbackPage() {
  const params = useParams()
  const router = useRouter()
  const rawId = params.responseId
  const responseId = Array.isArray(rawId) ? rawId[0] : rawId

  const [result, setResult] = useState<ResponseDTO | null>(null)

  useEffect(() => {
    if (!responseId) {
      router.replace('/')
      return
    }
    getResponseResult(responseId)
      .then((r) => setResult(r as unknown as ResponseDTO))
      .catch((err) => {
        console.error(err)
        router.replace('/')
      })
  }, [responseId, router])

  if (!result) return <p className={styles.emptyState}>Carregando feedback…</p>

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Seu Feedback</h1>

      {result.answers.map((ans, i) => {
        const isSub = ans.question.questionType === 'SUB'
        const userAnswer = isSub ? ans.subjectiveText : ans.alternative?.content

        const finalScore = (typeof ans.teacherScore === 'number' ? ans.teacherScore : ans.score)
        const finalFeedback = (ans.teacherFeedback ?? ans.feedback)

        return (
          <div key={ans.id} className={styles.answerCard}>
            <p className={styles.questionLabel}>Questão {i + 1}</p>
            <p className={styles.questionText}>{ans.question.text}</p>

            <p className={styles.responseText}>
              <strong>Sua resposta:</strong> {userAnswer ?? '–'}
            </p>

            <p className={styles.scoreText}>
              <strong>Nota:</strong> {typeof finalScore === 'number' ? finalScore.toFixed(1) : '–'}
              {typeof ans.score === 'number' && typeof ans.teacherScore === 'number' ? (
                <span className={styles.tagOverride}> (professor)</span>
              ) : null}
            </p>

            <p className={styles.feedbackText}>
              <strong>Feedback:</strong> {finalFeedback ?? '–'}
            </p>

            {typeof ans.score === 'number' && typeof ans.teacherScore === 'number' ? (
              <p className={styles.aiNote}>
                <em>Nota IA: {ans.score.toFixed(1)} — Feedback IA: {ans.feedback ?? '–'}</em>
              </p>
            ) : null}
          </div>
        )
      })}
    </section>
  )
}
