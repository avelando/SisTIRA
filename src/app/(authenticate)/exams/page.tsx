'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Eye, Edit, Trash2, Calendar } from 'lucide-react'

import { useExams } from '@/hooks/app/useExams'
import { Toolbar } from '@/components/ui/ToolBar/ToolBar'
import { EmptyState } from '@/components/ui/EmptyState'
import { Pagination } from '@/components/ui/Pagination/Pagination'
import { FileText } from 'lucide-react'

export default function ExamsPage() {
  const router = useRouter()
  const {
    pageExams,
    filteredExams,
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
  } = useExams()

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
        <>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={selectedExams.length === filteredExams.length}
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
                  Mostrando {Math.min(filteredExams.length, (currentPage - 1) * 10 + 1)} a{' '}
                  {Math.min(currentPage * 10, filteredExams.length)} de {filteredExams.length}{' '}
                  provas
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-semibold uppercase text-slate-600">
                      Prova
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-semibold uppercase text-slate-600">
                      Data de Criação
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-semibold uppercase text-slate-600">
                      Questões
                    </th>
                    <th className="py-3 px-6 text-right text-xs font-semibold uppercase text-slate-600">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {pageExams.map(exam => (
                    <tr
                      key={exam.id}
                      className="cursor-pointer hover:bg-slate-50 transition-colors"
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
                        <span className="font-medium text-slate-900">
                          {exam.questionsCount ?? 0} questões
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              router.push(`/exams/${exam.id}`)
                            }}
                            title="Visualizar"
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              router.push(`/exams/${exam.id}`)
                            }}
                            title="Editar"
                            className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              handleDelete(exam.id)
                            }}
                            title="Excluir"
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
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
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  )
}
