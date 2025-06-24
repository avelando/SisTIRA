'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getExams, deleteExam } from '@/api/exams'
import { Edit, Trash2, Eye, Calendar, FileText } from 'lucide-react'

import { Toolbar } from '@/components/ui/ToolBar/ToolBar'
import { EmptyState } from '@/components/ui/EmptyState'

interface Exam {
  id: string
  title: string
  createdAt: string
  questionsCount?: number
  status?: 'draft' | 'published' | 'archived'
}

export default function ExamsPage() {
  const router = useRouter()
  const [exams, setExams] = useState<Exam[]>([])
  const [selectedExams, setSelectedExams] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    status: '',
    dateRange: '',
    sortBy: 'createdAt',
  })

  useEffect(() => {
    loadExams()
  }, [])

  async function loadExams() {
    const data = await getExams()
    setExams(data)
    setSelectedExams([])
    setCurrentPage(1)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta prova?')) return
    await deleteExam(id)
    setExams(prev => prev.filter(x => x.id !== id))
    setSelectedExams(prev => prev.filter(x => x !== id))
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedExams(checked ? exams.map(e => e.id) : [])
  }

  const handleSelectOne = (id: string, checked: boolean) => {
    setSelectedExams(prev =>
      checked ? [...prev, id] : prev.filter(x => x !== id)
    )
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

  const totalPages = Math.ceil(exams.length / itemsPerPage)

  const getPagination = () => {
    const delta = 2
    const range: (number | '...')[] = []
    const res: (number | '...')[] = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }
    if (currentPage - delta > 2) res.push(1, '...')
    else res.push(1)
    res.push(...range)
    if (currentPage + delta < totalPages - 1) res.push('...', totalPages)
    else if (totalPages > 1) res.push(totalPages)
    return res
  }

  const filteredExams = exams
    .filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(e => (filters.status ? e.status === filters.status : true))

  const start = (currentPage - 1) * itemsPerPage
  const end = start + itemsPerPage
  const pageExams = filteredExams.slice(start, end)

  return (
    <div>
      <Toolbar
        searchValue={searchQuery}
        onSearch={value => {
          setSearchQuery(value)
          setCurrentPage(1)
        }}
        isFilterOpen={isFilterOpen}
        onToggleFilters={() => setIsFilterOpen(o => !o)}

        statusValue={filters.status}
        onStatusChange={newStatus => {
          setFilters(f => ({ ...f, status: newStatus }))
          setCurrentPage(1)
        }}
        onStatusClear={() => {
          setFilters({ status: '', dateRange: '', sortBy: 'createdAt' })
          setCurrentPage(1)
          setIsFilterOpen(false)
        }}
        onStatusApply={() => setIsFilterOpen(false)}

        questionFilters={{
          questionType: '',
          educationLevel: '',
          difficulty: '',
          disciplineId: '',
        }}
        onQuestionFilterChange={() => {}}
        onQuestionFilterClear={() => {}}
        onQuestionFilterApply={() => {}}
        disciplines={[]}

        bankFilterValue=""
        onBankFilterChange={() => {}}
        onBankFilterClear={() => {}}
        onBankFilterApply={() => {}}
        bankFilterOptions={[]}
      />

      {filteredExams.length === 0 ? (
        <EmptyState
          icon={<FileText size={24} className="text-slate-400" />}
          title="Nenhuma prova encontrada"
          message="Crie sua primeira prova para começar."
          actionLabel="Criar Nova Prova"
          onAction={() => router.push('/exams/new')}
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {/* Cabeçalho de seleção e contagem */}
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={selectedExams.length === exams.length}
                  onChange={e => handleSelectAll(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 focus:ring-opacity-50"
                />
                {selectedExams.length > 0 && (
                  <span className="font-medium">
                    {selectedExams.length} selecionada
                    {selectedExams.length > 1 ? 's' : ''}
                  </span>
                )}
              </label>
              <div className="text-sm text-slate-600">
                Mostrando {start + 1} a {Math.min(end, filteredExams.length)} de{' '}
                {filteredExams.length} provas
              </div>
            </div>
          </div>

          {/* Tabela de exames */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Prova
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Data de Criação
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Questões
                  </th>
                  <th className="text-right py-3 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {pageExams.map(exam => (
                  <tr
                    key={exam.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/exams/${exam.id}`)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedExams.includes(exam.id)}
                          onChange={e => {
                            e.stopPropagation()
                            handleSelectOne(exam.id, e.target.checked)
                          }}
                          className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 focus:ring-opacity-50"
                        />
                        <div>
                          <div className="font-medium text-slate-900">{exam.title}</div>
                          <div className="text-xs text-slate-500">
                            ID: {exam.id.slice(0, 8)}…
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar size={16} />
                        <span>{formatDate(exam.createdAt)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-slate-900 font-medium">
                        {exam.questionsCount || 0} questões
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={e => {
                            e.stopPropagation()
                            router.push(`/exams/${exam.id}`)
                          }}
                          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50"
                          title="Visualizar"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation()
                            router.push(`/exams/${exam.id}`)
                          }}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation()
                            handleDelete(exam.id)
                          }}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Página {currentPage} de {totalPages}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50"
                  >
                    Anterior
                  </button>
                  {getPagination().map((p, i) =>
                    p === '...' ? (
                      <span key={i} className="px-3 py-2 text-slate-400">…</span>
                    ) : (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(p as number)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50 ${
                          p === currentPage
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-600 bg-white border border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50"
                  >
                    Próxima
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
