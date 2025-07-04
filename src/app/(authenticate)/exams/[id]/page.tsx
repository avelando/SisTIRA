'use client'

import React, { useEffect, useRef, useState, useTransition } from 'react'
import { useParams, useRouter } from 'next/navigation'
import debounce from 'lodash/debounce'
import { createExam, getExam, updateExam } from '@/api/exams'
import type { FullExam, ExamUpdatePayload } from '@/interfaces/ExamsProps'
import type { Question } from '@/interfaces/QuestionProps'
import LoadingBar from '@/components/ui/LoadingBar'
import ExamInfo from '@/components/exam/ExamInfo'
import QuestionList from '@/components/exam/QuestionList'
import SidebarActions from '@/components/exam/SidebarActions'
import ExistingQuestionsModal from '@/components/modals/ExistingQuestions'

export default function ExamPage() {
  const { id } = useParams()
  const router = useRouter()
  const examId = Array.isArray(id) ? id[0] : id ?? ''

  const [exam, setExam] = useState<FullExam | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [showAddQuestion, setShowAddQuestion] = useState(false)
  const [showExisting, setShowExisting] = useState(false)
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    text: '',
    questionType: 'OBJ',
    alternatives: Array(4).fill('').map(() => ({ content: '', correct: false })),
  })
  const [isPending, startTransition] = useTransition()
  const isFirstLoad = useRef(true)

  useEffect(() => {
    if (!examId || examId === 'undefined') return;
    (async () => {
      if (examId === 'new') {
        const created = await createExam({
          title: 'Prova sem título',
          description: '',
          isPublic: false,
          generateAccessCode: true,
        })
        router.replace(`/exams/${created.id}`)
      } else {
        const data = await getExam(examId)
        setExam(data)
        setQuestions(data.allQuestions)
        isFirstLoad.current = false
      }
    })()
  }, [examId, router])

  const debouncedUpdate = useRef(
    debounce((payload: ExamUpdatePayload) => {
      if (!examId) return
      startTransition(async () => {
        await updateExam(examId, payload)
        const fresh = await getExam(examId)
        setExam(fresh)
        setQuestions(fresh.allQuestions)
      })
    }, 500)
  ).current

  const addQuestion = () => {
    if (!newQuestion.text?.trim()) return

    const q: Question = {
      id: Date.now().toString(),
      text: newQuestion.text.trim(),
      questionType: newQuestion.questionType!,
      alternatives:
        newQuestion.questionType === 'OBJ' ? newQuestion.alternatives! : undefined,
    }

    setQuestions(prev => [...prev, q])
    setNewQuestion({
      text: '',
      questionType: 'OBJ',
      alternatives: Array(4).fill('').map(() => ({ content: '', correct: false })),
    })
    setShowAddQuestion(false)
  }

  const removeQuestion = (qid: string) =>
    setQuestions(prev => prev.filter(q => q.id !== qid))

  const updateQuestionOption = (idx: number, value: string) => {
    setNewQuestion(prev => {
      const alts = [...(prev.alternatives ?? [])]
      alts[idx].content = value
      return { ...prev, alternatives: alts }
    })
  }

  if (!exam) {
    return <p className="text-center mt-20">Carregando prova…</p>
  }

  return (
    <div className="flex flex-col">
      <LoadingBar loading={isPending} />

      <div className="w-full max-w-4xl mx-auto space-y-6 p-0">
        <ExamInfo
          title={exam.title}
          description={exam.description ?? ''}
          onTitleChange={v => {
            setExam(prev => prev && { ...prev, title: v })
            if (!isFirstLoad.current && v !== exam.title) {
              debouncedUpdate({ title: v, description: exam.description ?? ''})
            }
          }}
          onDescriptionChange={v => {
            setExam(prev => prev && { ...prev, description: v })
            if (!isFirstLoad.current && v !== exam.description) {
              debouncedUpdate({ title: exam.title, description: v })
            }
          }}
        />

        <div className="relative">
          <QuestionList
            questions={questions}
            showAdd={showAddQuestion}
            showExisting={showExisting}
            newQuestion={newQuestion}
            onAddNew={() => setShowAddQuestion(true)}
            onOpenExisting={() => setShowExisting(true)}
            onChangeNew={q => setNewQuestion(q)}
            onAddQuestion={addQuestion}
            onUpdateOption={updateQuestionOption}
            onRemove={removeQuestion}
          />

          <SidebarActions
            visible={questions.length > 0}
            onAddQuestion={() => setShowAddQuestion(true)}
            onOpenBank={() => setShowExisting(true)}
          />
        </div>
      </div>

      <ExistingQuestionsModal
        visible={showExisting}
        examId={exam.id}
        currentBankIds={exam.examQuestionBanks.map(b => b.questionBank.id)}
        currentQuestionIds={questions.map(q => q.id)}
        onClose={() => setShowExisting(false)}
        onAdded={updated => {
          setExam(updated)
          setQuestions(updated.allQuestions)
          setShowExisting(false)
        }}
      />
    </div>
  )
}
