'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getExams, deleteExam } from '@/api/exams'
import {
  Edit,
  Trash2,
  Eye,
  Calendar,
  FileText,
  Search,
  Filter,
  Download,
  Plus,
  ChevronDown,
  Settings,
  User as UserIcon,
} from 'lucide-react'

interface Exam {
  id: string
  title: string
  createdAt: string
  questionsCount?: number
  status?: 'draft' | 'published' | 'archived'
}

const statusColors = {
  draft: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  published: 'bg-green-100 text-green-800 border-green-200',
  archived: 'bg-gray-100 text-gray-800 border-gray-200',
}

const statusLabels = {
  draft: 'Rascunho',
  published: 'Publicada',
  archived: 'Arquivada',
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

  const totalItems = exams.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

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
    .filter(e =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(e =>
      filters.status ? e.status === filters.status : true
    )

  const start = (currentPage - 1) * itemsPerPage
  const end = start + itemsPerPage
  const pageExams = filteredExams.slice(start, end)

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-1 gap-3 w-full sm:w-auto">
            <div className="relative flex-1 max-w-md">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Buscar provas..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50 focus:border-slate-900 outline-none transition-colors"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(v => !v)}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50"
              >
                <Filter size={16} />
                <span className="hidden sm:inline">Filtros</span>
              </button>
              {isFilterOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 p-4 z-10">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Status
                      </label>
                      <select
                        value={filters.status}
                        onChange={e => {
                          const s = e.target.value
                          setFilters(f => ({ ...f, status: s }))
                          setCurrentPage(1)
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50 focus:border-slate-900 outline-none"
                      >
                        <option value="">Todos</option>
                        <option value="draft">Rascunho</option>
                        <option value="published">Publicada</option>
                        <option value="archived">Arquivada</option>
                      </select>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => {
                          setFilters({ status: '', dateRange: '', sortBy: 'createdAt' })
                          setIsFilterOpen(false)
                          setCurrentPage(1)
                        }}
                        className="flex-1 px-3 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Limpar
                      </button>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="flex-1 px-3 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={() => router.push('/exams/new')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50"
            >
              <Plus size={16} />
              <span>Nova Prova</span>
            </button>
          </div>
        </div>
      </div>

      {filteredExams.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={24} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Nenhuma prova encontrada
          </h3>
          <p className="text-slate-600 mb-6">
            Crie sua primeira prova para começar.
          </p>
          <button
            onClick={() => router.push('/exams/new')}
            className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50"
          >
            Criar Nova Prova
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
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
                Mostrando {start + 1} a {Math.min(end, filteredExams.length)} de {filteredExams.length} provas
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Prova</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Data de Criação</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Questões</th>
                  <th className="text-right py-3 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Ações</th>
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
                          <div className="text-xs text-slate-500">ID: {exam.id.slice(0, 8)}…</div>
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
                      <span key={i} className="px-3 py-2 text-slate-400">
                        ...
                      </span>
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
