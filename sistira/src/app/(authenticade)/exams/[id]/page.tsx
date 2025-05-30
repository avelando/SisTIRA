'use client'
import { useState, useEffect, useRef, useTransition } from 'react'
import { useParams } from 'next/navigation'
import debounce from 'lodash/debounce'
import { getExam, updateExam } from '@/api/exams'
import { ExamUpdatePayload, FullExam } from '@/interfaces/ExamsProps'
import FloatingActions from '@/components/ui/FloatingActions'
import ExistingQuestionsModal from '@/components/modals/ExistingQuestionsModal'
import LoadingBar from '@/components/ui/LoadingBar'
import styles from '@/styles/ExamDetails.module.css'

export default function ExamDetailsPage() {
  const { id } = useParams()
  const examId = Array.isArray(id) ? id[0] : id ?? ''
  const [exam, setExam] = useState<FullExam | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isPending, startTransition] = useTransition()
  const isFirstLoad = useRef(true)
  const [showExisting, setShowExisting] = useState(false)

  useEffect(() => {
    if (!examId) return
    ;(async () => {
      const data = await getExam(examId)
      setExam(data)
      setTitle(data.title)
      setDescription(data.description ?? '')
      isFirstLoad.current = false
    })()
  }, [examId])

  const debouncedUpdate = useRef(
    debounce((p: ExamUpdatePayload) => {
      if (!examId) return
      startTransition(async () => {
        await updateExam(examId, p)
        setExam(await getExam(examId))
      })
    }, 500)
  ).current

  if (!exam) return <p>Carregando prova…</p>

  return (
    <>
      <LoadingBar loading={isPending} />
      <div className={styles.container}>
        <input
          className={styles.input}
          value={title}
          onChange={e => {
            setTitle(e.target.value)
            if (!isFirstLoad.current && e.target.value !== exam.title)
              debouncedUpdate({ title: e.target.value, description })
          }}
        />
        <textarea
          className={styles.textarea}
          value={description}
          onChange={e => {
            setDescription(e.target.value)
            if (!isFirstLoad.current && e.target.value !== exam.description)
              debouncedUpdate({ title, description: e.target.value })
          }}
        />

        {exam.accessCode && (
          <div className={styles.accessCodeBanner}>
            <strong>Código de Acesso:</strong>{' '}
            <code>{exam.accessCode}</code>
            <p>Compartilhe com quem responder.</p>
          </div>
        )}

        <div className={styles.questionList}>
          {exam.allQuestions.map(q => (
            <div key={q.id} className={styles.question}>
              <strong>• {q.text}</strong>
              {q.questionType === 'OBJ' && q.alternatives && (
                <ul className={styles.alternativesList}>
                  {q.alternatives.map((alt, i) => (
                    <li key={i} className={styles.alternativeItem}>
                      {alt.correct ? '✓' : '○'} {alt.content}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <FloatingActions onOpen={() => setShowExisting(true)} />
        <ExistingQuestionsModal
          visible={showExisting}
          examId={examId}
          currentBankIds={exam.examQuestionBanks.map(b => b.questionBank.id)}
          currentQuestionIds={exam.allQuestions.map(q => q.id)}
          onClose={() => setShowExisting(false)}
          onAdded={u => { setExam(u); setShowExisting(false) }}
        />
      </div>
    </>
  )
}
