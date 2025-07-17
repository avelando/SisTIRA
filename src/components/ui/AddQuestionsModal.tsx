'use client'

import React from 'react'
import { BaseModal } from '@/components/ui/BaseModal'
import { useAddQuestionModal, UseAddQuestionModalOptions } from '@/hooks/modals/useAddQuestionModal'
import styles from '@/styles/AddQuestionModal.module.css'

export default function AddQuestionModal(props: UseAddQuestionModalOptions) {
  const {
    visible,
    createMode,
    editMode,
    viewMode,
    banks,
    assigned,
    available,
    selectedBankIds,
    selectedQuestionIds,
    expandedBanks,
    formName,
    formDescription,
    setFormName,
    setFormDescription,
    loading,
    toggleBank,
    toggleQuestion,
    toggleExpandBank,
    hasChanges,
    handleSave,
  } = useAddQuestionModal(props)

  if (!visible) return null

  const title = createMode
    ? 'Criar Banco de Questões'
    : editMode
      ? 'Editar Banco de Questões'
      : viewMode
        ? 'Visualizar Banco de Questões'
        : 'Adicionar Bancos & Questões'

  const saveLabel = viewMode
    ? 'Fechar'
    : createMode
      ? 'Criar Banco'
      : editMode
        ? 'Salvar Alterações'
        : 'Salvar'

  return (
    <BaseModal
      visible={visible}
      title={title}
      onClose={props.onClose}
      onSave={handleSave}
      saveLabel={saveLabel}
      saveLoading={loading}
      disableSave={!hasChanges()}
      maxWidthClass="max-w-3xl"
    >
      <div className={styles.scrollContainer}>
        {(createMode || editMode || viewMode) && (
          <>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Nome</label>
              <input
                type="text"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                disabled={viewMode}
                className={styles.input}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Descrição</label>
              <textarea
                value={formDescription}
                onChange={e => setFormDescription(e.target.value)}
                disabled={viewMode}
                rows={3}
                className={styles.textarea}
              />
            </div>
          </>
        )}

        {!createMode && !editMode && !viewMode && (
          <div className={styles.bankList}>
            {banks.map(bank => (
              <div key={bank.id} className={styles.bankCard}>
                <div className={styles.bankHeader}>
                  <label className={styles.bankLabel}>
                    <input
                      type="checkbox"
                      checked={selectedBankIds.has(bank.id)}
                      onChange={e => {
                        e.stopPropagation()
                        toggleBank(bank.id)
                      }}
                      className={styles.checkbox}
                    />
                    <span className={styles.bankName}>{bank.name}</span>
                  </label>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      toggleExpandBank(bank.id)
                    }}
                    className={styles.expandButton}
                    aria-label={expandedBanks.has(bank.id) ? 'Recolher' : 'Expandir'}
                  >
                    {expandedBanks.has(bank.id) ? '▾' : '▸'}
                  </button>
                </div>
                {expandedBanks.has(bank.id) && (
                  <ul className={styles.questionList}>
                    {bank.questions?.map(qb => (
                      <li key={qb.questionId} className={styles.questionItem}>
                        <label className={styles.questionLabel}>
                          <input
                            type="checkbox"
                            checked={selectedQuestionIds.has(qb.questionId)}
                            onChange={() => toggleQuestion(qb.questionId)}
                            className={styles.checkbox}
                          />
                          <span className={styles.questionText}>{qb.question.text}</span>
                        </label>
                      </li>
                    ))}
                    {bank.questions?.length === 0 && (
                      <li className={styles.emptyMessage}>Nenhuma questão neste banco.</li>
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {(createMode || editMode) && (
          <div className={styles.availableSection}>
            <h3 className={styles.sectionTitle}>Questões Disponíveis</h3>
            <ul className={styles.availableList}>
              {available.map(q => (
                <li key={q.id} className={styles.questionItem}>
                  <label className={styles.questionLabel}>
                    <input
                      type="checkbox"
                      checked={false}
                      onChange={() => toggleQuestion(q.id)}
                      className={styles.checkbox}
                    />
                    <span className={styles.questionText}>{q.text}</span>
                  </label>
                </li>
              ))}
              {available.length === 0 && (
                <li className={styles.emptyMessage}>Não há questões disponíveis.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </BaseModal>
  )
}
