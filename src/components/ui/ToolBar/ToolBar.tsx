'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Plus } from 'lucide-react'

import { ActionButton } from '@/components/ui/ToolBar/ActionButton'
import { SearchBar } from '@/components/ui/ToolBar/SearchBar'
import { FilterButton } from '@/components/ui/ToolBar/FilterButton'

import { StatusFilterPanel } from '@/components/ui/ToolBar/ExamFilterPanel'
import { QuestionFilterPanel } from '@/components/ui/ToolBar/QuestionFilterPanel'
import { QuestionBankFilterPanel } from '@/components/ui/ToolBar/QuestionBankFilterPanel'

import { ToolbarProps } from '@/interfaces/Activities'

export const Toolbar: React.FC<ToolbarProps> = ({
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
    buttonRoute = '/questionsBank/new'
  } else if (path.startsWith('/questions')) {
    placeholder = 'Buscar questões...'
    buttonLabel = 'Nova Questão'
    buttonRoute = '/questions/new'
  }

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
            onClick={() => router.push(buttonRoute)}
          />
        </div>
      </div>
    </div>
  )
}
