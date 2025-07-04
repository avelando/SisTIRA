// interfaces/Activities.ts

import { ReactNode } from 'react'

export interface ActionButtonProps {
  icon?: ReactNode
  label?: string
  title?: string
  description?: string
  onClick?: () => void
}

export interface SearchBarProps {
  value: string
  onChange: (newValue: string) => void
  placeholder?: string
}

export interface FilterButtonProps {
  isOpen: boolean
  onToggle: () => void
  children: ReactNode
}

export interface StatusFilterPanelProps {
  value: string
  onChange: (newStatus: string) => void
  onClear: () => void
  onApply: () => void
}

export interface QuestionFilterPanelProps {
  filters: {
    questionType: string
    educationLevel: string
    difficulty: string
    disciplineId: string
  }
  onChange: (
    field: keyof QuestionFilterPanelProps['filters'],
    value: string
  ) => void
  onClear: () => void
  onApply: () => void
  disciplines: { id: string; name: string }[]
}

export interface QuestionBankFilterPanelProps {
  isOpen: boolean
  onToggle: () => void
  value: string
  onChange: (newValue: string) => void
  onClear: () => void
  onApply: () => void
  options: { id: string; name: string }[]
}

export interface ToolbarProps {
  searchValue: string
  onSearch: (v: string) => void

  isFilterOpen: boolean
  onToggleFilters: () => void

  statusValue: string
  onStatusChange: (s: string) => void
  onStatusClear: () => void
  onStatusApply: () => void

  questionFilters: {
    questionType: string
    educationLevel: string
    difficulty: string
    disciplineId: string
  }
  onQuestionFilterChange: (
    field: keyof ToolbarProps['questionFilters'],
    value: string
  ) => void
  onQuestionFilterClear: () => void
  onQuestionFilterApply: () => void
  disciplines: { id: string; name: string }[]

  bankFilterValue: string
  onBankFilterChange: (v: string) => void
  onBankFilterClear: () => void
  onBankFilterApply: () => void
  bankFilterOptions: { id: string; name: string }[]
}
