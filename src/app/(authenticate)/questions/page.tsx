'use client'

import React from 'react'
import { HelpCircle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Toolbar } from '@/components/ui/ToolBar/ToolBar'
import { QuestionCard } from '@/components/questions/QuestionCard'
import { QuestionsSkeleton } from '@/components/questions/QuestionsSkeleton'
import { QuestionModal } from '@/components/modals/QuestionModal'
import { useDisciplines } from '@/hooks/useDisciplines'
import { useResponsive } from '@/hooks/useResponsive'
import { useQuestions } from '@/hooks/app/useQuestions'

export default function QuestionsPage() {
  const router = useRouter()
  const { isMobile }    = useResponsive()
  const { disciplines } = useDisciplines()
  const {
    filteredQuestions,
    loading,
    error,

    search,
    setSearch,
    filters,
    setFilters,
    isFilterOpen,
    setIsFilterOpen,

    isModalOpen,
    setIsModalOpen,
    modalMode,
    editingQuestion,
    handleCreateClick,
    handleEditClick,

    handleDelete,
    handleSubmit,

    hasActiveFilters,
    loadQuestions,
  } = useQuestions()

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

        onNewClick={handleCreateClick} 
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
                {filters.questionType === 'OBJ' ? 'Objetiva' : 'Subjetiva'}
              </span>
              <button
                onClick={() => setFilters(f => ({ ...f, questionType: '' }))}
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
        <div
          className={`grid gap-6 ${
            isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredQuestions.map(q => (
            <QuestionCard
              key={q.id ?? 'default-id'}
              question={q}
              onEdit={() => handleEditClick(q)}
              onDelete={() => handleDelete(q.id ?? 'default-id')}
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
