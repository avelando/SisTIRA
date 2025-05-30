'use client'
import { useState, useEffect, FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getExamForResponse, submitExamResponse } from '@/api/exams'
import { QuestionUI } from '@/interfaces/QuestionProps'
import styles from '@/styles/ExamRespond.module.css'

export default function RespondPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()

  const [step, setStep] = useState<'loading'|'enter-code'|'ready'>('loading')
  const [inputCode, setInputCode] = useState('')
  const [examId, setExamId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState<string>('')
  const [accessCode, setAccessCode] = useState('')
  const [questions, setQuestions] = useState<QuestionUI[]>([])
  const [error, setError] = useState<string>('')

  // 1) Tenta acessar direto pelo id (caso seja isPublic)
  useEffect(() => {
    getExamForResponse(id)
      .then(init)
      .catch(() => setStep('enter-code'))
  }, [id])

  function init(data: Awaited<ReturnType<typeof getExamForResponse>>) {
    setExamId(data.examId)
    setTitle(data.title)
    setDescription(data.description ?? '')
    setAccessCode(data.accessCode ?? '')
    setQuestions(data.questions.map(q => ({
      ...q,
      selectedOption: undefined,
      answerText: '',
      mode: 'manual',
      wrong: q.modelAnswers?.find(m => m.type === 'WRONG')?.content ?? '',
      median: q.modelAnswers?.find(m => m.type === 'MEDIAN')?.content ?? '',
      correct: q.modelAnswers?.find(m => m.type === 'CORRECT')?.content ?? '',
    })))
    setStep('ready')
  }

  // 2) Se privada, submete código e reutiliza init()
  async function handleCodeSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    try {
      const data = await getExamForResponse(inputCode.trim())
      init(data)
    } catch {
      setError('Código inválido')
    }
  }

  // 3) Submete respostas
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const answers = questions.map(q =>
      q.questionType === 'OBJ'
        ? { questionId: q.id, alternativeId: q.selectedOption! }
        : { questionId: q.id, textResponse: q.answerText }
    )
    try {
      await submitExamResponse({ examId, accessCode, answers })
      router.push(`/exams/${examId}/results`)
    } catch {
      setError('Falha ao enviar respostas.')
    }
  }

  if (step === 'loading') {
    return <p>Carregando prova…</p>
  }
  if (step === 'enter-code') {
    return (
      <div className={styles.container}>
        <form onSubmit={handleCodeSubmit} className={styles.form}>
          <h1>Prova Privada</h1>
          <p>Digite o código de acesso:</p>
          <input
            type="text"
            className={styles.input}
            value={inputCode}
            onChange={e => setInputCode(e.target.value)}
            required
          />
          <button type="submit" className={styles.submitBtn}>
            Continuar
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    )
  }

  // ready
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      {questions.length === 0 && <p>Não há perguntas nesta prova.</p>}

      {questions.map(q => (
        <div key={q.id} className={styles.questionBlock}>
          <h3>{q.text}</h3>
          {q.questionType === 'OBJ' ? (
            q.alternatives?.map(alt => (
              <label key={alt.id} className={styles.optionLabel}>
                <input
                  type="radio"
                  name={q.id}
                  checked={q.selectedOption === alt.id}
                  onChange={() =>
                    setQuestions(prev =>
                      prev.map(x =>
                        x.id === q.id ? { ...x, selectedOption: alt.id } : x
                      )
                    )
                  }
                  required
                />
                {alt.content}
              </label>
            ))
          ) : (
            <>
              <textarea
                className={styles.textarea}
                placeholder="Digite sua resposta"
                value={q.answerText}
                onChange={e =>
                  setQuestions(prev =>
                    prev.map(x =>
                      x.id === q.id ? { ...x, answerText: e.target.value } : x
                    )
                  )
                }
                required
              />
            </>
          )}
        </div>
      ))}

      <button type="submit" className={styles.submitBtn}>
        Enviar respostas
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  )
}
