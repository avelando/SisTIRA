'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Eye, Edit, Trash2, Calendar } from 'lucide-react';

import { useExams } from '@/hooks/app/useExams';
import { Toolbar } from '@/components/ui/ToolBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import styles from '@/styles/ExamsPage.module.css';
import { useDeleteExam } from 'sistira';

export default function ExamsPage() {
  const router = useRouter();
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
    handleSelectAll,
    handleSelectOne,
    formatDate,
  } = useExams();

  const { deleteExam, loading: deleting, error: deleteError } = useDeleteExam();

  function handleNewExam() {
    router.push('/exams/new');
  }

  return (
    <div className={styles.container}>
      <Toolbar
        searchValue={searchQuery}
        onSearch={(value) => { setSearchQuery(value); setCurrentPage(1); }}
        isFilterOpen={isFilterOpen}
        onToggleFilters={() => setIsFilterOpen(o => !o)}
        statusValue={filters.status}
        onStatusChange={(newStatus) => { setFilters(f => ({ ...f, status: newStatus })); setCurrentPage(1); }}
        onStatusClear={() => { setFilters({ status: '', dateRange: '', sortBy: 'createdAt' }); setCurrentPage(1); setIsFilterOpen(false); }}
        onStatusApply={() => setIsFilterOpen(false)}
        questionFilters={{ questionType: '', educationLevel: '', difficulty: '', disciplineId: '' }}
        onQuestionFilterChange={() => { }}
        onQuestionFilterClear={() => { }}
        onQuestionFilterApply={() => { }}
        disciplines={[]}
        bankFilterValue=""
        onBankFilterChange={() => { }}
        onBankFilterClear={() => { }}
        onBankFilterApply={() => { }}
        bankFilterOptions={[]}
        onNewClick={handleNewExam}
      />

      {filteredExams.length === 0 ? (
        <EmptyState
          icon={<Calendar size={24} className={styles.emptyIcon} />}
          title="Nenhuma prova encontrada"
          message="Crie sua primeira prova para começar."
          actionLabel="Criar Nova Prova"
          onAction={handleNewExam}
        />
      ) : (
        <>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <label className={styles.headerLabel}>
                <input
                  type="checkbox"
                  checked={selectedExams.length === filteredExams.length}
                  onChange={e => handleSelectAll(e.target.checked)}
                  className={styles.checkbox}
                />
                {selectedExams.length > 0 && (
                  <span className={styles.selectedCount}>
                    {selectedExams.length} selecionada{selectedExams.length > 1 ? 's' : ''}
                  </span>
                )}
              </label>
              <div className={styles.headerInfo}>
                Mostrando {Math.min(filteredExams.length, (currentPage - 1) * 10 + 1)} a {Math.min(currentPage * 10, filteredExams.length)} de {filteredExams.length} provas
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    <th className={styles.th}>Prova</th>
                    <th className={styles.th}>Data de Criação</th>
                    <th className={styles.th}>Questões</th>
                    <th className={`${styles.th} ${styles.actions}`}>Ações</th>
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  {pageExams.map(exam => (
                    <tr
                      key={exam.id}
                      className={styles.tr}
                      onClick={() => router.push(`/exams/${exam.id}`)}
                    >
                      <td className={styles.td}>
                        <div className={styles.tdContent}>
                          <input
                            type="checkbox"
                            checked={selectedExams.includes(exam.id)}
                            onChange={e => { e.stopPropagation(); handleSelectOne(exam.id, e.target.checked); }}
                            className={styles.checkbox}
                          />
                          <div className={styles.titleWrapper}>
                            <div className={styles.examTitle}>{exam.title}</div>
                            <div className={styles.examId}>ID: {exam.id.slice(0, 8)}…</div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.dateCell}>
                          <Calendar size={16} />
                          <span>{formatDate(exam.createdAt)}</span>
                        </div>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.questionsCount}>{exam.questionsCount ?? 0} questões</span>
                      </td>
                      <td className={`${styles.td} ${styles.actionsCell}`}>
                        <div className={styles.actionButtons}>
                          <button
                            onClick={e => { e.stopPropagation(); router.push(`/exams/${exam.id}`); }}
                            title="Visualizar"
                            className={styles.viewButton}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={e => { e.stopPropagation(); router.push(`/exams/${exam.id}`); }}
                            title="Editar"
                            className={styles.editButton}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              deleteExam(exam.id).catch(() => {
                              });
                            }}
                            disabled={deleting}
                            title="Excluir"
                            className={styles.deleteButton}
                          >
                            {deleting
                              ? 'Excluindo…'
                              : <Trash2 size={16} />}
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
  );
}
