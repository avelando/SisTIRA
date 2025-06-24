'use client'

import React, { useState, useEffect } from 'react'
import { Plus, HelpCircle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Toolbar } from '@/components/ui/ToolBar/ToolBar'
import { QuestionCard } from '@/components/questions/QuestionCard'
import { QuestionsSkeleton } from '@/components/questions/QuestionsSkeleton'
import { QuestionModal } from '@/components/questions/QuestionModal'
import { useDisciplines } from '@/hooks/useDisciplines'
import { useResponsive } from '@/hooks/useResponsive'
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '@/api/questions'
import { Question } from '@/interfaces/QuestionProps'

export default function QuestionsPage() {
  const router = useRouter()
  const { isMobile } = useResponsive()
  const { disciplines } = useDisciplines()

  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    questionType:   '',
    educationLevel: '',
    difficulty:     '',
    disciplineId:   '',
  })

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isModalOpen, setIsModalOpen]   = useState(false)
  const [modalMode, setModalMode]       = useState<'create'|'edit'>('create')
  const [editingQuestion, setEditingQuestion] =
    useState<Question|null>(null)

  useEffect(() => {
    loadQuestions()
  }, [])

  async function loadQuestions() {
    setLoading(true)
    setError(null)
    try {
      const data = await getQuestions()
      setQuestions(data)
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar questões.')
    } finally {
      setLoading(false)
    }
  }

  function handleCreateClick() {
    setEditingQuestion(null)
    setModalMode('create')
    setIsModalOpen(true)
  }

  function handleEditClick(q: Question) {
    setEditingQuestion(q)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja deletar esta questão?')) return
    try {
      await deleteQuestion(id)
      setQuestions(prev => prev.filter(q => q.id !== id))
    } catch (err: any) {
      alert(err.message || 'Falha ao deletar questão.')
    }
  }

  async function handleSubmit(payload: any) {
    try {
      if (modalMode === 'create') await createQuestion(payload)
      else await updateQuestion(payload.id, payload)
      await loadQuestions()
      setIsModalOpen(false)
    } catch (err: any) {
      alert(err.message || 'Erro ao salvar questão.')
    }
  }

  const filteredQuestions = questions.filter(q => {
    if (search && !q.text.toLowerCase().includes(search.toLowerCase()))
      return false
    if (filters.questionType && q.questionType !== filters.questionType)
      return false
    if (
      filters.disciplineId &&
      !q.questionDisciplines?.some(d => d.discipline.id === filters.disciplineId)
    )
      return false
    return true
  })

  const hasActiveFilters =
    !!search ||
    !!filters.questionType ||
    !!filters.educationLevel ||
    !!filters.difficulty ||
    !!filters.disciplineId

  return (
    <div className="space-y-6">
      <Toolbar
        searchValue={search}
        onSearch={value => {
          setSearch(value)
          setIsFilterOpen(false)
        }}
        isFilterOpen={isFilterOpen}
        onToggleFilters={() => setIsFilterOpen(o => !o)}

        statusValue=""
        onStatusChange={() => {}}
        onStatusClear={() => {}}
        onStatusApply={() => {}}

        questionFilters={filters}
        onQuestionFilterChange={(field, value) =>
          setFilters(f => ({ ...f, [field]: value }))
        }
        onQuestionFilterClear={() =>
          setFilters({
            questionType:   '',
            educationLevel: '',
            difficulty:     '',
            disciplineId:   '',
          })
        }
        onQuestionFilterApply={() => setIsFilterOpen(false)}
        disciplines={disciplines}

        bankFilterValue=""
        onBankFilterChange={() => {}}
        onBankFilterClear={() => {}}
        onBankFilterApply={() => {}}
        bankFilterOptions={[]}
      />

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {search && (
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
              <span>Busca: “{search}”</span>
              <button
                onClick={() => setSearch('')}
                className="text-slate-500 hover:text-slate-700"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {filters.questionType && (
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
              <span>
                Tipo:{' '}
                {filters.questionType === 'OBJ'
                  ? 'Objetiva'
                  : 'Subjetiva'}
              </span>
              <button
                onClick={() =>
                  setFilters(f => ({ ...f, questionType: '' }))
                }
                className="text-slate-500 hover:text-slate-700"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {filters.disciplineId && (
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
              <span>
                Disciplina:{' '}
                {disciplines.find(d => d.id === filters.disciplineId)?.name}
              </span>
              <button
                onClick={() =>
                  setFilters(f => ({ ...f, disciplineId: '' }))
                }
                className="text-slate-500 hover:text-slate-700"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <QuestionsSkeleton />
      ) : error ? (
        <div className="bg-white rounded-xl border border-red-200 p-12 text-center">
          <HelpCircle size={48} className="text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadQuestions}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            Tentar Novamente
          </button>
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <HelpCircle size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-slate-600 mb-6">Nenhuma questão encontrada</p>
          <button
            onClick={handleCreateClick}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            Criar Nova Questão
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuestions.map(q => (
            <QuestionCard
              key={q.id}
              question={q}
              onEdit={() => handleEditClick(q)}
              onDelete={() => handleDelete(q.id)}
            />
          ))}
        </div>
      )}

      <QuestionModal
        visible={isModalOpen}
        mode={modalMode}
        question={editingQuestion ?? undefined}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  )
}
