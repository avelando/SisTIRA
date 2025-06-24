import { useState, useEffect } from 'react'
import { getQuestionBanks, deleteQuestionBank } from '@/api/questionsBank'
import { QuestionBankProps } from '@/interfaces/QuestionBankProps'

export function useQuestionBanks(itemsPerPage = 10) {
  const [banks, setBanks] = useState<QuestionBankProps[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({ disciplineId: '' })

  useEffect(() => {
    ;(async () => {
      const data = await getQuestionBanks()
      setBanks(data)
      setSelected([])
      setCurrentPage(1)
    })()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este banco?')) return
    await deleteQuestionBank(id)
    setBanks(bs => bs.filter(b => b.id !== id))
    setSelected(sel => sel.filter(x => x !== id))
  }

  const handleSelectAll = (checked: boolean) =>
    setSelected(checked ? banks.map(b => b.id) : [])

  const handleSelectOne = (id: string, checked: boolean) =>
    setSelected(sel => (checked ? [...sel, id] : sel.filter(x => x !== id)))

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

  const totalItems = banks.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const start = (currentPage - 1) * itemsPerPage
  const end = start + itemsPerPage

  const filtered = banks
    .filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(b =>
      filters.disciplineId
        ? b.questionBankDisciplines?.some(
            d => d.discipline.id === filters.disciplineId
          )
        : true
    )

  const pageBanks = filtered.slice(start, end)

  const disciplineOptions = Array.from(
    new Map(
      banks
        .flatMap(b => b.questionBankDisciplines ?? [])
        .map(d => [d.discipline.name, d.discipline])
    ).values()
  )

  return {
    banks,
    filtered,
    pageBanks,
    selected,
    searchQuery,
    setSearchQuery,
    isFilterOpen,
    setIsFilterOpen,
    filters,
    start,
    end,
    setFilters,
    disciplineOptions,
    currentPage,
    setCurrentPage,
    totalPages,
    handleDelete,
    handleSelectAll,
    handleSelectOne,
    formatDate,
  }
}
