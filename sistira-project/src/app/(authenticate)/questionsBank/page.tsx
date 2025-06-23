'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  getQuestionBanks,
  deleteQuestionBank,
} from '@/api/questionsBank'
import {
  Plus,
  Search,
  Filter,
  X,
  Eye,
  Edit,
  Trash2,
  Calendar,
  FileText,
} from 'lucide-react'

interface Bank {
  id: string
  name: string
  createdAt: string
  questions?: any[]
  questionBankDisciplines?: {
    discipline: { id: string; name: string }
    isPredominant: boolean
  }[]
}

export default function QuestionBankPage() {
  const router = useRouter()

  const [banks, setBanks] = useState<Bank[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({ disciplineId: '' })

  // load data
  useEffect(() => {
    loadBanks()
  }, [])

  async function loadBanks() {
    const data = await getQuestionBanks()
    setBanks(data)
    setSelected([])
    setCurrentPage(1)
  }

  // delete one
  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este banco?')) return
    await deleteQuestionBank(id)
    setBanks(prev => prev.filter(b => b.id !== id))
    setSelected(prev => prev.filter(x => x !== id))
  }

  // pagination helpers
  const totalItems = banks.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const start = (currentPage - 1) * itemsPerPage
  const end = start + itemsPerPage

  function getPagination() {
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

  // filtering
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

  // format date
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

  return (
    <div className="space-y-6">
      {/* Search + Filter + Add */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Buscar bancos..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none transition-colors"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(v => !v)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <Filter size={16} />
              <span className="hidden sm:inline">Filtros</span>
            </button>
            {isFilterOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 p-4 z-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Disciplina
                    </label>
                    <select
                      value={filters.disciplineId}
                      onChange={e => {
                        setFilters(f => ({
                          ...f,
                          disciplineId: e.target.value,
                        }))
                        setCurrentPage(1)
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
                    >
                      <option value="">Todas</option>
                      {banks
                        .flatMap(b => b.questionBankDisciplines ?? [])
                        .map(d => d.discipline)
                        .filter(
                          (v, i, a) => a.findIndex(x => x.id === v.id) === i
                        )
                        .map(d => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => {
                        setFilters({ disciplineId: '' })
                        setIsFilterOpen(false)
                        setCurrentPage(1)
                      }}
                      className="flex-1 px-3 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
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
        </div>

        {/* Novo Banco */}
        <button
          onClick={() => router.push('/questions-bank/new')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <Plus size={16} /> Novo Banco
        </button>
      </div>

      {/* Lista ou estado vazio */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={24} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Nenhum banco encontrado
          </h3>
          <p className="text-slate-600 mb-6">
            Crie seu primeiro banco de questões.
          </p>
          <button
            onClick={() => router.push('/questions-bank/new')}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            Criar Novo Banco
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {/* header com select-all e contagem */}
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={selected.length === banks.length}
                  onChange={e => {
                    const chk = e.target.checked
                    setSelected(chk ? banks.map(b => b.id) : [])
                  }}
                  className="rounded border-slate-300 focus:ring-slate-900"
                />
                {selected.length > 0 && (
                  <span className="font-medium">
                    {selected.length} selecionada
                    {selected.length > 1 ? 's' : ''}
                  </span>
                )}
              </label>
              <div className="text-sm text-slate-600">
                Mostrando {start + 1} a {Math.min(end, filtered.length)} de{' '}
                {filtered.length} bancos
              </div>
            </div>
          </div>

          {/* tabela */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {[
                    'ID',
                    'TÍTULO',
                    'DISCIPLINA',
                    'DATA',
                    'QUESTÕES',
                    'AÇÕES',
                  ].map(h => (
                    <th
                      key={h}
                      className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {pageBanks.map(bank => (
                  <tr
                    key={bank.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/questions-bank/${bank.id}`)}
                  >
                    <td className="py-4 px-6">{bank.id.slice(0, 8)}…</td>
                    <td className="py-4 px-6 font-medium text-slate-900">
                      {bank.name}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {bank.questionBankDisciplines
                          ?.filter(d => d.isPredominant)
                          .map(d => (
                            <span
                              key={d.discipline.id}
                              className="inline-flex items-center px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full text-xs"
                            >
                              {d.discipline.name}
                            </span>
                          ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar size={16} />
                        <span>{formatDate(bank.createdAt)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-slate-900">
                        {bank.questions?.length ?? 0} questões
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={e => {
                            e.stopPropagation()
                            router.push(`/questions-bank/${bank.id}`)
                          }}
                          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Visualizar"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation()
                            router.push(`/questions-bank/${bank.id}/edit`)
                          }}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation()
                            handleDelete(bank.id)
                          }}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

          {/* paginação */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Página {currentPage} de {totalPages}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      setCurrentPage(p => Math.max(1, p - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  {getPagination().map((p, i) =>
                    p === '...' ? (
                      <span key={i} className="px-3 py-2 text-slate-400">
                        …
                      </span>
                    ) : (
                      <button
                        key={i}
                        onClick={() =>
                          setCurrentPage(p as number)
                        }
                        className={`px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 ${
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
                    onClick={() =>
                      setCurrentPage(p =>
                        Math.min(totalPages, p + 1)
                      )
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
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
