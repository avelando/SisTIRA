import { useState, useEffect } from 'react'
import { getExams, deleteExam } from '@/api/exams'
import { ExamSummary } from '@/interfaces/ExamsProps'

interface Filters {
  status: string
  dateRange: string
  sortBy: string
}

export function useExams(itemsPerPage = 10) {
  const [exams, setExams] = useState<ExamSummary[]>([])
  const [selectedExams, setSelectedExams] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    status: '',
    dateRange: '',
    sortBy: 'createdAt',
  })

  useEffect(() => {
    ;(async () => {
      const data = await getExams()
      setExams(data)
    })()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta prova?')) return
    await deleteExam(id)
    setExams(prev => prev.filter(x => x.id !== id))
    setSelectedExams(prev => prev.filter(x => x !== id))
  }

  const handleSelectAll = (checked: boolean) =>
    setSelectedExams(checked ? exams.map(e => e.id) : [])

  const handleSelectOne = (id: string, checked: boolean) =>
    setSelectedExams(prev =>
      checked ? [...prev, id] : prev.filter(x => x !== id)
    )

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

  const filteredExams = exams.filter(e =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredExams.length / itemsPerPage)
  const start = (currentPage - 1) * itemsPerPage
  const end = start + itemsPerPage
  const pageExams = filteredExams.slice(start, end)

  return {
    exams,
    filteredExams,
    pageExams,
    selectedExams,

    searchQuery,
    setSearchQuery,
    isFilterOpen,
    setIsFilterOpen,
    filters,
    setFilters,

    currentPage,
    setCurrentPage,
    totalPages,

    handleDelete,
    handleSelectAll,
    handleSelectOne,
    formatDate,
  }
}
