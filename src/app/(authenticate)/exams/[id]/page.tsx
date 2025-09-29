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
  generateExamAccessCode,
  clearExamAccessCode,
  setExamVisibility,
} from '@/api/exams'
import type { FullExam, ExamUpdatePayload, Visibility } from '@/interfaces/ExamsProps'
import type { Question } from '@/interfaces/QuestionProps'

import LoadingBar from '@/components/ui/LoadingBar'
import ExamInfo from '@/components/ui/ExamInfo'
import QuestionList from '@/components/ui/QuestionList'
import SidebarActions from '@/components/ui/SidebarActions'
import AddQuestionsModal from '@/components/ui/AddQuestionsModal'
import { QuestionModal } from '@/components/ui/QuestionModal'
import ExpandableFAB from '@/components/ui/ExpandableFAB'

import ExamTabsCard, { ExamTabKey } from '@/components/ui/ExamTabsCard'
import ExamSettingsPanel from '@/components/ui/ExamSettingsPanel'
import ExamResponsesPanel from '@/components/ui/ExamResponsesPanel'

import styles from '@/styles/ExamPage.module.css'

export default function ExamPage() {
  const { id } = useParams()
  const router = useRouter()
  const examId = Array.isArray(id) ? id[0] : id ?? ''

  const [exam, setExam] = useState<FullExam | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [showExisting, setShowExisting] = useState(false)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)

  const [isPending, startTransition] = useTransition()
  const isFirstUpdate = useRef(true)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')

  const [activeTab, setActiveTab] = useState<ExamTabKey>('prova')

  // Derivados das novas props
  const accessCode = exam?.settings?.accessCode ?? undefined
  const visibility: Visibility = exam?.settings?.visibility ?? 'PRIVATE'

  // (opcional) pode vir de outra fonte; manter undefined por enquanto
  const responsesCount = undefined

  const debouncedUpdate = useRef(
    debounce((payload: ExamUpdatePayload) => {
      if (!examId) return
      startTransition(async () => {
        await updateExam(examId, payload)
        const fresh = await getExam(examId)
        setExam(fresh)
        // FullExam.allQuestions -> mapeia para o tipo do componente
        setQuestions(fresh.allQuestions as unknown as Question[])
      })
    }, 500)
  ).current

  useEffect(() => {
    if (!examId) return
    ;(async () => {
      try {
        if (examId === 'new') {
          const created = await createExam({ title: 'Prova sem título', description: '' })
          router.replace(`/exams/${created.id}`)
          return
        }
        const data = await getExam(examId)
        setExam(data)
        setQuestions(data.allQuestions as unknown as Question[])
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    })()
  }, [examId, router])

  if (loading) {
    return (
      <div className={styles.centerBox}>
        <p className={styles.muted}>Carregando prova…</p>
      </div>
    )
  }

  if (notFound || !exam) {
    return (
      <div className={styles.centerBox}>
        <p className={styles.warn}>⚠️ Prova não encontrada</p>
      </div>
    )
  }

  const refreshExam = async () => {
    const fresh = await getExam(examId)
    setExam(fresh)
    setQuestions(fresh.allQuestions as unknown as Question[])
  }

  const handleRemove = async (qid: string) => {
    if (!confirm('Deseja remover esta questão da prova?')) return
    try {
      await removeQuestionsFromExam(examId, [qid])
      await refreshExam()
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

  // -------- Handlers de Configurações --------

  const handleToggleVisibility = () => {
    startTransition(async () => {
      try {
        const next: Visibility = visibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC'
        await setExamVisibility(examId, next)
        await refreshExam()
      } catch {
        alert('Erro ao alterar privacidade.')
      }
    })
  }

  const handleGenerateCode = () => {
    startTransition(async () => {
      try {
        await generateExamAccessCode(examId)
        // regra de produto: gerou código ⇒ torna PRIVATE
        if (visibility !== 'PRIVATE') {
          await setExamVisibility(examId, 'PRIVATE')
        }
        await refreshExam()
      } catch {
        alert('Erro ao gerar código.')
      }
    })
  }

  const handleClearCode = () => {
    startTransition(async () => {
      try {
        await clearExamAccessCode(examId)
        await refreshExam()
      } catch {
        alert('Erro ao limpar código.')
      }
    })
  }

  return (
    <div className={styles.wrapper}>
      <LoadingBar loading={isPending} />

      <div className={styles.block}>
        <ExamTabsCard active={activeTab} onChange={setActiveTab} responsesCount={responsesCount} />
      </div>

      {activeTab === 'configuracoes' && (
        <div className={styles.block}>
          <ExamSettingsPanel
            examId={exam.id}
            visibility={visibility}
            accessCode={accessCode}
            onToggleVisibility={handleToggleVisibility}
            onGenerateCode={handleGenerateCode}
            onClearCode={handleClearCode}
          />
        </div>
      )}

      {activeTab === 'respostas' && (
        <div className={styles.block}>
          <ExamResponsesPanel examId={exam.id} />
        </div>
      )}

      {activeTab === 'prova' && (
        <div className={styles.mainGrid}>
          <div className={styles.mainCol}>
            <div className={styles.block}>
              <ExamInfo
                title={exam.title}
                description={exam.description ?? ''}
                onTitleChange={(v) => {
                  setExam(prev => prev && { ...prev, title: v })
                  if (!isFirstUpdate.current) {
                    debouncedUpdate({ title: v, description: exam.description ?? '' })
                  }
                  isFirstUpdate.current = false
                }}
                onDescriptionChange={(v) => {
                  setExam(prev => prev && { ...prev, description: v })
                  if (!isFirstUpdate.current) {
                    debouncedUpdate({ title: exam.title, description: v })
                  }
                  isFirstUpdate.current = false
                }}
              />
            </div>

            <QuestionList
              questions={questions}
              showExisting={showExisting}
              onOpenExisting={() => setShowExisting(true)}
              onRemove={handleRemove}
              onEdit={handleEdit}
            />
          </div>

          <SidebarActions
            visible={questions.length > 0}
            onOpenBank={() => setShowExisting(true)}
            onAddQuestion={handleCreate}
          />
        </div>
      )}

      <AddQuestionsModal
        visible={showExisting}
        examId={exam.id}
        currentBankIds={exam.examQuestionBanks.map(b => b.questionBank.id)}
        currentQuestionIds={questions.map(q => q.id)}
        onClose={() => setShowExisting(false)}
        onAdded={(updated) => {
          setExam(updated)
          setQuestions(updated.allQuestions as unknown as Question[])
          setShowExisting(false)
        }}
      />

      <QuestionModal
        visible={showQuestionModal}
        mode={modalMode}
        question={modalMode === 'edit' ? editingQuestion! : undefined}
        onClose={() => setShowQuestionModal(false)}
        onSubmit={async (data) => {
          try {
            if (modalMode === 'create') {
              const created = await createQuestion(data)
              const updated = await addQuestionsToExam(examId, [created.id])
              setExam(updated)
              setQuestions(updated.allQuestions as unknown as Question[])
            } else {
              await updateQuestion(data.id!, data)
              await refreshExam()
            }
          } catch {
            alert('Erro ao salvar questão.')
          } finally {
            setShowQuestionModal(false)
          }
        }}
      />

      <ExpandableFAB onAddExisting={() => setShowExisting(true)} onCreateNew={handleCreate} />
    </div>
  )
}
