'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  getQuestionBanks,
  deleteQuestionBank,
} from '@/api/questionsBank'
import {
  Eye,
  Edit,
  Trash2,
  Calendar,
  FileText,
} from 'lucide-react'
import { Toolbar } from '@/components/ui/ToolBar/ToolBar'
import { EmptyState } from '@/components/ui/EmptyState'

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

  useEffect(() => {
    loadBanks()
  }, [])

  async function loadBanks() {
    const data = await getQuestionBanks()
    setBanks(data)
    setSelected([])
    setCurrentPage(1)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este banco?')) return
    await deleteQuestionBank(id)
    setBanks(prev => prev.filter(b => b.id !== id))
    setSelected(prev => prev.filter(x => x !== id))
  }

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

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

  const disciplineOptions = Array.from(
    new Map(
      banks
        .flatMap(b => b.questionBankDisciplines ?? [])
        .map(d => [d.discipline.id, d.discipline])
    ).values()
  )

  return (
    <div className="space-y-6">
      <Toolbar
        searchValue={searchQuery}
        onSearch={q => {
          setSearchQuery(q)
          setCurrentPage(1)
        }}
        isFilterOpen={isFilterOpen}
        onToggleFilters={() => {
          setIsFilterOpen(o => !o)
          setCurrentPage(1)
        }}

        statusValue=""
        onStatusChange={() => {}}
        onStatusClear={() => {}}
        onStatusApply={() => {}}

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

        bankFilterValue={filters.disciplineId}
        onBankFilterChange={v => {
          setFilters(f => ({ ...f, disciplineId: v }))
          setCurrentPage(1)
        }}
        onBankFilterClear={() => {
          setFilters({ disciplineId: '' })
          setIsFilterOpen(false)
          setCurrentPage(1)
        }}
        onBankFilterApply={() => setIsFilterOpen(false)}
        bankFilterOptions={disciplineOptions}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={<FileText size={24} className="text-slate-400" />}
          title="Nenhum banco encontrado"
          message="Crie seu primeiro banco de questões."
          actionLabel="Criar Novo Banco"
          onAction={() => router.push('/questions-bank/new')}
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={selected.length === banks.length}
                  onChange={e =>
                    setSelected(e.target.checked ? banks.map(b => b.id) : [])
                  }
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

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['ID', 'TÍTULO', 'DISCIPLINA', 'DATA', 'QUESTÕES', 'AÇÕES'].map(h => (
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
                    className="px-3 py-2 text-sm text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
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
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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
