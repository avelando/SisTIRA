'use client'

import React, { useEffect, useState, useRef, useTransition } from 'react'
import { useParams, useRouter } from 'next/navigation'
import debounce from 'lodash/debounce'

import { createQuestion, updateQuestion, getQuestion } from '@/api/questions'
import {
  addQuestionsToExam,
  createExam,
  getExam,
  updateExam,
  removeQuestionsFromExam,
} from '@/api/exams'
import type { FullExam, ExamUpdatePayload } from '@/interfaces/ExamsProps'
import type { Question } from '@/interfaces/QuestionProps'

import LoadingBar from '@/components/ui/LoadingBar'
import ExamInfo from '@/components/ui/ExamInfo'
import QuestionList from '@/components/ui/QuestionList'
import SidebarActions from '@/components/ui/SidebarActions'
import AddQuestionsModal from '@/components/ui/AddQuestionsModal'
import { QuestionModal } from '@/components/ui/QuestionModal'
import ExpandableFAB from '@/components/ui/ExpandableFAB'
import ShareExamFAB from '@/components/ui/ShareExamFAB'
import ViewResponsesFAB from '@/components/ui/ViewResponsesFAB'
import ResponsesModal from '@/components/ui/ResponsesModal'

import styles from '@/styles/ExamPage.module.css'

export default function ExamPage() {
  const { id } = useParams()
  const router = useRouter()
  const examId = Array.isArray(id) ? id[0] : id ?? ''

  const [exam, setExam] = useState<FullExam | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [responsesVisible, setResponsesVisible] = useState(false)
  const [showExisting, setShowExisting] = useState(false)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)

  const [isPending, startTransition] = useTransition()
  const isFirstUpdate = useRef(true)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')

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

  useEffect(() => {
    if (!examId) return
      ; (async () => {
        try {
          if (examId === 'new') {
            const created = await createExam({
              title: 'Prova sem título',
              description: '',
              isPublic: false,
              generateAccessCode: true,
            })
            router.replace(`/exams/${created.id}`)
            return
          }
          const data = await getExam(examId)
          setExam(data)
          setQuestions(data.allQuestions)
        } catch {
          setNotFound(true)
        } finally {
          setLoading(false)
        }
      })()
  }, [examId, router])

  if (loading) {
    return (
      <div className={styles.center}>
        <p>Carregando prova…</p>
      </div>
    )
  }

  if (notFound || !exam) {
    return (
      <div className={styles.centerError}>
        <p>⚠️ Prova não encontrada</p>
      </div>
    )
  }

  const handleRemove = async (qid: string) => {
    if (!confirm('Deseja remover esta questão da prova?')) return
    try {
      await removeQuestionsFromExam(examId, [qid])
      const fresh = await getExam(examId)
      setExam(fresh)
      setQuestions(fresh.allQuestions)
    } catch {
      alert('Erro ao remover questão.')
    }
  }

  const handleEdit = async (qid: string) => {
    try {
      const full = await getQuestion(qid)
      setEditingQuestion(full)
      setModalMode('edit')
      setShowQuestionModal(true)
    } catch {
      alert('Erro ao carregar dados da questão.')
    }
  }

  const handleCreate = () => {
    setEditingQuestion(null)
    setModalMode('create')
    setShowQuestionModal(true)
  }

  return (
    <div className={styles.wrapper}>
      <LoadingBar loading={isPending} />

      <div className={styles.content}>
        <ExamInfo
          title={exam.title}
          description={exam.description ?? ''}
          onTitleChange={v => {
            setExam(prev => prev && { ...prev, title: v })
            if (!isFirstUpdate.current) {
              debouncedUpdate({ title: v, description: exam.description ?? '' })
            }
            isFirstUpdate.current = false
          }}
          onDescriptionChange={v => {
            setExam(prev => prev && { ...prev, description: v })
            if (!isFirstUpdate.current) {
              debouncedUpdate({ title: exam.title, description: v })
            }
            isFirstUpdate.current = false
          }}
        />

        <div className={styles.mainArea}>
          <QuestionList
            questions={questions}
            showExisting={showExisting}
            onOpenExisting={() => setShowExisting(true)}
            onRemove={handleRemove}
            onEdit={handleEdit}
          />
          <SidebarActions
            visible={questions.length > 0}
            onOpenBank={() => setShowExisting(true)}
            onAddQuestion={handleCreate}
          />
        </div>
      </div>

      <AddQuestionsModal
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

      <QuestionModal
        visible={showQuestionModal}
        mode={modalMode}
        question={modalMode === 'edit' ? editingQuestion! : undefined}
        onClose={() => setShowQuestionModal(false)}
        onSubmit={async data => {
          try {
            if (modalMode === 'create') {
              const created = await createQuestion(data)
              const updated = await addQuestionsToExam(examId, [created.id])
              setExam(updated)
              setQuestions(updated.allQuestions)
            } else {
              await updateQuestion(data.id!, data)
              const fresh = await getExam(examId)
              setExam(fresh)
              setQuestions(fresh.allQuestions)
            }
          } catch {
            alert('Erro ao salvar questão.')
          } finally {
            setShowQuestionModal(false)
          }
        }}
      />

      <ExpandableFAB
        onAddExisting={() => setShowExisting(true)}
        onCreateNew={handleCreate}
      />
      <ShareExamFAB examId={exam.id} accessCode={exam.accessCode ?? undefined} />
      <ViewResponsesFAB onClick={() => setResponsesVisible(true)} />

      <ResponsesModal
        visible={responsesVisible}
        examId={exam.id}
        onClose={() => setResponsesVisible(false)}
      />
    </div>
  )
}
