'use client'

import React, { useState, useEffect } from 'react'
import { Plus, HelpCircle, Search, Filter, X } from 'lucide-react'
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
  const { isMobile } = useResponsive()
  const { disciplines } = useDisciplines()

  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<string | null>(null)

  const [search, setSearch]     = useState('')
  const [filters, setFilters]   = useState({
    questionType:   '',
    educationLevel: '',
    difficulty:     '',
    disciplineId:   '',
  })

  const hasActiveFilters =
    !!filters.questionType ||
    !!filters.educationLevel ||
    !!filters.difficulty ||
    !!filters.disciplineId

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isModalOpen, setIsModalOpen]   = useState(false)
  const [modalMode, setModalMode]       = useState<'create' | 'edit'>('create')
  const [editingQuestion, setEditingQuestion] =
    useState<Question | null>(null)

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

  useEffect(() => {
    loadQuestions()
  }, [])

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
      if (modalMode === 'create') {
        await createQuestion(payload)
      } else {
        await updateQuestion(payload.id, payload)
      }
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
      !q.questionDisciplines?.some(
        d => d.discipline.id === filters.disciplineId
      )
    )
      return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Buscar questões..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50 outline-none transition-colors"
          />
        </div>

        {/* Filter button */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(o => !o)}
            className={`
              flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900
              ${hasActiveFilters
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-300 hover:bg-slate-50'}
            `}
          >
            <Filter size={16} />
            <span className="hidden sm:inline">Filtros</span>
            {hasActiveFilters && (
              <span className="bg-white text-slate-900 text-xs px-1.5 py-0.5 rounded-full font-medium">
                {[
                  filters.questionType,
                  filters.educationLevel,
                  filters.difficulty,
                  filters.disciplineId,
                ].filter(Boolean).length}
              </span>
            )}
          </button>

          {isFilterOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 p-4 z-10">
              <div className="space-y-4">
                {/* Question Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tipo de Questão
                  </label>
                  <select
                    value={filters.questionType}
                    onChange={e =>
                      setFilters(f => ({ ...f, questionType: e.target.value }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
                  >
                    <option value="">Todos os tipos</option>
                    <option value="OBJ">Objetiva</option>
                    <option value="SUB">Subjetiva</option>
                  </select>
                </div>

                {/* Discipline */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Disciplina
                  </label>
                  <select
                    value={filters.disciplineId}
                    onChange={e =>
                      setFilters(f => ({ ...f, disciplineId: e.target.value }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
                  >
                    <option value="">Todas as disciplinas</option>
                    {disciplines.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setFilters({
                        questionType: '',
                        educationLevel: '',
                        difficulty: '',
                        disciplineId: '',
                      })
                      setIsFilterOpen(false)
                    }}
                    className="flex-1 px-3 py-2 text-sm text-slate-600 border rounded-lg hover:bg-slate-50"
                  >
                    Limpar
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="flex-1 px-3 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* New Question */}
        <button
          onClick={handleCreateClick}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <Plus size={16} /> Nova Questão
        </button>
      </div>

      {/* Active filters */}
      {(search || hasActiveFilters) && (
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
                {filters.questionType === 'OBJ' ? 'Objetiva' : 'Subjetiva'}
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
                {
                  disciplines.find(d => d.id === filters.disciplineId)
                    ?.name
                }
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

      {/* Content */}
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
