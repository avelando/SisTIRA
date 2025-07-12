'use client'

import React from 'react'
import { FileText, HelpCircle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Toolbar } from '@/components/ui/ToolBar'
import { QuestionCard } from '@/components/ui/QuestionCard'
import { QuestionsSkeleton } from '@/components/ui/QuestionsSkeleton'
import { QuestionModal } from '@/components/ui/QuestionModal'
import { useDisciplines } from '@/hooks/useDisciplines'
import { useResponsive } from '@/hooks/useResponsive'
import { useQuestions } from '@/hooks/app/useQuestions'
import { EmptyState } from '@/components/ui/EmptyState'
import styles from '@/styles/QuestionsPage.module.css'

export default function QuestionsPage() {
  const router = useRouter()
  const { isMobile } = useResponsive()
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
    <div className={styles.container}>
      <Toolbar
        searchValue={search}
        onSearch={value => { setSearch(value); setIsFilterOpen(false) }}
        isFilterOpen={isFilterOpen}
        onToggleFilters={() => setIsFilterOpen(o => !o)}
        statusValue=""
        onStatusChange={() => {}}
        onStatusClear={() => {}}
        onStatusApply={() => {}}
        questionFilters={filters}
        onQuestionFilterChange={(field, value) => setFilters(f => ({ ...f, [field]: value }))}
        onQuestionFilterClear={() => setFilters({ questionType: '', educationLevel: '', difficulty: '', disciplineId: '' })}
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
        <div className={styles.filtersSummary}>
          {search && (
            <div className={styles.filterBadge}>
              <span>Busca: “{search}”</span>
              <button onClick={() => setSearch('')} className={styles.clearBtn}>
                <X size={14} />
              </button>
            </div>
          )}
          {filters.questionType && (
            <div className={styles.filterBadge}>
              <span>Tipo: {filters.questionType === 'OBJ' ? 'Objetiva' : 'Subjetiva'}</span>
              <button onClick={() => setFilters(f => ({ ...f, questionType: '' }))} className={styles.clearBtn}>
                <X size={14} />
              </button>
            </div>
          )}
          {filters.disciplineId && (
            <div className={styles.filterBadge}>
              <span>Disciplina: {disciplines.find(d => d.id === filters.disciplineId)?.name}</span>
              <button onClick={() => setFilters(f => ({ ...f, disciplineId: '' }))} className={styles.clearBtn}>
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <QuestionsSkeleton />
      ) : error ? (
        <div className={styles.errorState}>
          <HelpCircle size={48} className={styles.errorIcon} />
          <p className={styles.errorMessage}>{error}</p>
          <button onClick={loadQuestions} className={styles.retryBtn}>
            Tentar Novamente
          </button>
        </div>
      ) : filteredQuestions.length === 0 ? (
        <EmptyState
          icon={<FileText size={24} className={styles.emptyIcon} />}
          title="Nenhum banco encontrado"
          message="Crie seu primeiro banco de questões."
          actionLabel="Criar Novo Banco"
          onAction={handleCreateClick}
        />
      ) : (
        <div className={`${styles.grid} ${isMobile ? styles.singleCol : ''}`}>
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
      />
    </div>
  )
}
