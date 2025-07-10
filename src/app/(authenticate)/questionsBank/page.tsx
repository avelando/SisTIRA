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
import { Pagination } from '@/components/ui/Pagination/Pagination'
import ExistingQuestionsModal from '@/components/ui/Modals/CreateQuestionBank'
import { QuestionBankProps } from '@/interfaces/QuestionBankProps'

export default function QuestionBankPage() {
  const router = useRouter()

  const [banks, setBanks] = useState<QuestionBankProps[]>([])
  const [filtered, setFiltered] = useState<QuestionBankProps[]>([])
  const [pageBanks, setPageBanks] = useState<QuestionBankProps[]>([])
  const [selected, setSelected] = useState<string[]>([])

  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({ disciplineId: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view' | null>(null)
  const [modalBankId, setModalBankId] = useState<string | null>(null)
  const showModal = modalMode !== null
  const closeModal = () => setModalMode(null)

  useEffect(() => {
    ; (async () => {
      const data = await getQuestionBanks()
      setBanks(data)
      setSelected([])
      setCurrentPage(1)
    })()
  }, [])

  useEffect(() => {
    let result = banks.filter(b =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    if (filters.disciplineId) {
      result = result.filter(b =>
        b.questionBankDisciplines?.some(
          d => d.discipline.id === filters.disciplineId
        )
      )
    }
    setFiltered(result)
    setCurrentPage(1)
  }, [banks, searchQuery, filters])

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage
    setPageBanks(filtered.slice(start, start + itemsPerPage))
  }, [filtered, currentPage])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este banco?')) return
    await deleteQuestionBank(id)
    setBanks(prev => prev.filter(b => b.id !== id))
    setSelected(prev => prev.filter(x => x !== id))
  }
  const handleSelectAll = (checked: boolean) =>
    setSelected(checked ? filtered.map(b => b.id) : [])
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

  const openCreateModal = () => {
    setModalMode('create')
    setModalBankId(null)
  }
  const openEditModal = (id: string) => {
    setModalMode('edit')
    setModalBankId(id)
  }
  const openViewModal = (id: string) => {
    setModalMode('view')
    setModalBankId(id)
  }

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
          setIsFilterOpen(v => !v)
          setCurrentPage(1)
        }}
        statusValue=""
        onStatusChange={() => { }}
        onStatusClear={() => { }}
        onStatusApply={() => { }}
        questionFilters={{
          questionType: '',
          educationLevel: '',
          difficulty: '',
          disciplineId: '',
        }}
        onQuestionFilterChange={() => { }}
        onQuestionFilterClear={() => { }}
        onQuestionFilterApply={() => { }}
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
        onNewClick={openCreateModal}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={<FileText size={24} className="text-slate-400" />}
          title="Nenhum banco encontrado"
          message="Crie seu primeiro banco de questões."
          actionLabel="Criar Novo Banco"
          onAction={openCreateModal}
        />
      ) : (
        <>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={selected.length === filtered.length}
                    onChange={e => handleSelectAll(e.target.checked)}
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
                  Mostrando{' '}
                  {(currentPage - 1) * itemsPerPage + 1} a{' '}
                  {Math.min(currentPage * itemsPerPage, filtered.length)} de{' '}
                  {filtered.length} bancos
                </div>
              </div>
            </div>

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
                    <tr key={bank.id} className="hover:bg-slate-50 transition-colors">
                      <td
                        className="py-4 px-6 cursor-pointer"
                        onClick={() => openViewModal(bank.id)}
                      >
                        {bank.id.slice(0, 8)}…
                      </td>
                      <td
                        className="py-4 px-6 font-medium text-slate-900 cursor-pointer"
                        onClick={() => openViewModal(bank.id)}
                      >
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
                            onClick={() => openViewModal(bank.id)}
                            title="Visualizar"
                            className="p-2 rounded-lg hover:bg-slate-100"
                          >
                            <Eye size={16} className="text-slate-400 hover:text-slate-600" />
                          </button>
                          <button
                            onClick={() => openEditModal(bank.id)}
                            title="Editar"
                            className="p-2 rounded-lg hover:bg-blue-50"
                          >
                            <Edit size={16} className="text-slate-400 hover:text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(bank.id)}
                            title="Excluir"
                            className="p-2 rounded-lg hover:bg-red-50"
                          >
                            <Trash2 size={16} className="text-slate-400 hover:text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={page => setCurrentPage(page)}
          />
        </>
      )}

      <ExistingQuestionsModal
        visible={showModal}
        createMode={modalMode === 'create'}
        editMode={modalMode === 'edit'}
        viewMode={modalMode === 'view'}
        bankId={modalBankId ?? undefined}
        examId=""
        currentBankIds={[]}
        currentQuestionIds={[]}
        onClose={closeModal}
        onAdded={() => { }}
        onCreated={newBank => {
          setBanks(prev => [newBank, ...prev])
          closeModal()
        }}
        onUpdated={updatedBank => {
          setBanks(prev =>
            prev.map(b => (b.id === updatedBank.id ? updatedBank : b))
          )
          closeModal()
        }}
      />
    </div>
  )
}
