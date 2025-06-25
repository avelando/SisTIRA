'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Plus } from 'lucide-react'

import { ActionButton } from './ActionButton'
import { SearchBar } from './SearchBar'
import { FilterButton } from './FilterButton'
import { StatusFilterPanel } from './ExamFilterPanel'
import { QuestionFilterPanel } from './QuestionFilterPanel'
import { QuestionBankFilterPanel } from './QuestionBankFilterPanel'
import { ToolbarProps } from '@/interfaces/Activities'

interface Props extends ToolbarProps {
  onNewClick?: () => void
}

export const Toolbar: React.FC<Props> = ({
  searchValue,
  onSearch,

  isFilterOpen,
  onToggleFilters,

  statusValue,
  onStatusChange,
  onStatusClear,
  onStatusApply,

  questionFilters,
  onQuestionFilterChange,
  onQuestionFilterClear,
  onQuestionFilterApply,
  disciplines,

  bankFilterValue,
  onBankFilterChange,
  onBankFilterClear,
  onBankFilterApply,
  bankFilterOptions,

  onNewClick,
}) => {
  const router = useRouter()
  const path = usePathname()

  let placeholder = 'Buscar...'
  let buttonLabel = 'Novo Item'
  let buttonRoute = '/'

  if (path.startsWith('/exams')) {
    placeholder = 'Buscar provas...'
    buttonLabel = 'Nova Prova'
    buttonRoute = '/exams/new'

  } else if (path.startsWith('/questionsBank')) {
    placeholder = 'Buscar no banco de questões...'
    buttonLabel = 'Novo Banco'
  } else if (path.startsWith('/questions')) {
    placeholder = 'Buscar questões...'
    buttonLabel = 'Nova Questão'
  }

  const handleNew = onNewClick ?? (() => router.push(buttonRoute))

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 gap-3 w-full sm:w-auto">
          <SearchBar value={searchValue} onChange={onSearch} placeholder={placeholder} />

          <FilterButton isOpen={isFilterOpen} onToggle={onToggleFilters}>
            {path.startsWith('/exams') && (
              <StatusFilterPanel
                value={statusValue}
                onChange={onStatusChange}
                onClear={onStatusClear}
                onApply={onStatusApply}
              />
            )}

            {path.startsWith('/questionsBank') && (
              <QuestionBankFilterPanel
                value={bankFilterValue}
                onChange={onBankFilterChange}
                onClear={onBankFilterClear}
                onApply={onBankFilterApply}
                options={bankFilterOptions}
              />
            )}

            {path.startsWith('/questions') && !path.startsWith('/questionsBank') && (
              <QuestionFilterPanel
                filters={questionFilters}
                onChange={onQuestionFilterChange}
                onClear={onQuestionFilterClear}
                onApply={onQuestionFilterApply}
                disciplines={disciplines}
              />
            )}
          </FilterButton>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <ActionButton
            label={buttonLabel}
            icon={<Plus size={16} />}
            onClick={handleNew}
          />
        </div>
      </div>
    </div>
  )
}
