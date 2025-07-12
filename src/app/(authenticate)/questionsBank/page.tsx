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

import { Toolbar } from '@/components/ui/ToolBar'
import { EmptyState } from '@/components/ui/EmptyState'
import { Pagination } from '@/components/ui/Pagination'
import ExistingQuestionsModal from '@/components/ui/CreateQuestionBank'
import { QuestionBankProps } from '@/interfaces/QuestionBankProps'
import styles from '@/styles/QuestionBankPage.module.css'

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
    ;(async () => {
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
    <div className={styles.root}>
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
        onNewClick={openCreateModal}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={<FileText size={24} className={styles.textGray400} />}
          title="Nenhum banco encontrado"
          message="Crie seu primeiro banco de questões."
          actionLabel="Criar Novo Banco"
          onAction={openCreateModal}
        />
      ) : (
        <>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selected.length === filtered.length}
                  onChange={e => handleSelectAll(e.target.checked)}
                  className={styles.checkbox}
                />
                {selected.length > 0 && (
                  <span className={styles.selectedCount}>
                    {selected.length} selecionada{selected.length > 1 ? 's' : ''}
                  </span>
                )}
              </label>
              <div className={styles.summary}>
                Mostrando{' '}
                {(currentPage - 1) * itemsPerPage + 1} a{' '}
                {Math.min(currentPage * itemsPerPage, filtered.length)} de{' '}
                {filtered.length} bancos
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    {[
                      'ID',
                      'TÍTULO',
                      'DISCIPLINA',
                      'DATA',
                      'QUESTÕES',
                      'AÇÕES',
                    ].map(h => (
                      <th key={h} className={styles.th}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  {pageBanks.map(bank => (
                    <tr key={bank.id} className={styles.trHover}>
                      <td className={styles.td} onClick={() => openViewModal(bank.id)}>
                        {bank.id.slice(0, 8)}…
                      </td>
                      <td className={styles.td} onClick={() => openViewModal(bank.id)}>
                        <span className={styles.bankName}>{bank.name}</span>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.disciplines}>
                          {bank.questionBankDisciplines
                            ?.filter(d => d.isPredominant)
                            .map(d => (
                              <span key={d.discipline.id} className={styles.disciplineBadge}>
                                {d.discipline.name}
                              </span>
                            ))}
                        </div>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.dateCell}>
                          <Calendar size={16} />
                          <span>{formatDate(bank.createdAt)}</span>
                        </div>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.questionCount}>
                          {bank.questions?.length ?? 0} questões
                        </span>
                      </td>
                      <td className={styles.tdRight}>
                        <div className={styles.actionButtons}>
                          <button
                            onClick={() => openViewModal(bank.id)}
                            title="Visualizar"
                            className={styles.iconButton}
                          >
                            <Eye size={16} className={styles.textGray400HoverGray600} />
                          </button>
                          <button
                            onClick={() => openEditModal(bank.id)}
                            title="Editar"
                            className={styles.iconButton}
                          >
                            <Edit size={16} className={styles.textGray400HoverBlue600} />
                          </button>
                          <button
                            onClick={() => handleDelete(bank.id)}
                            title="Excluir"
                            className={styles.iconButton}
                          >
                            <Trash2 size={16} className={styles.textGray400HoverRed600} />
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
        onAdded={() => {}}
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
