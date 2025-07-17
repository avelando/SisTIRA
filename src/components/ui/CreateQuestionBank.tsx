'use client'

import React from 'react'
import { BaseModal } from '@/components/ui/BaseModal'
import { useExistingQuestionsModal, UseExistingQuestionsModalOptions } from '@/hooks/modals/useExistingQuestionsModal'
import styles from '@/styles/ExistingQuestionsModal.module.css'

export default function ExistingQuestionsModal(props: UseExistingQuestionsModalOptions) {
  const {
    visible,
    createMode,
    editMode,
    viewMode,
    banks,
    assigned,
    available,
    selectedQuestionIds,
    selectedBankIds,
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
  } = useExistingQuestionsModal(props)

  if (!visible) return null

  const title = createMode
    ? 'Criar Banco de Questões'
    : editMode
      ? 'Editar Banco de Questões'
      : viewMode
        ? 'Visualizar Banco de Questões'
        : 'Associar Bancos & Questões'

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
      maxWidthClass="max-w-4xl"
    >
      <div className={styles.container}>
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
                className={`${styles.input} ${styles.textarea}`}
              />
            </div>
          </>
        )}

        {!createMode && !editMode && !viewMode && (
          <div className={styles.bankList}>
            {banks.map(b => (
              <div key={b.id} className={styles.bankCard}>
                <div
                  className={styles.bankHeader}
                  onClick={() => toggleExpandBank(b.id)}
                >
                  <label className={styles.bankLabel}>
                    <input
                      type="checkbox"
                      checked={selectedBankIds.has(b.id)}
                      onChange={() => toggleBank(b.id)}
                      className={styles.checkbox}
                    />
                    <span className={styles.bankName}>{b.name}</span>
                  </label>
                  <button
                    className={styles.expandButton}
                    aria-label={expandedBanks.has(b.id) ? 'Recolher' : 'Expandir'}
                  >
                    {expandedBanks.has(b.id) ? '▾' : '▸'}
                  </button>
                </div>
                {expandedBanks.has(b.id) && (
                  <ul className={styles.questionList}>
                    {b.questions?.map(q => (
                      <li key={q.questionId} className={styles.questionItem}>
                        <label className={styles.questionLabel}>
                          <input
                            type="checkbox"
                            checked={selectedQuestionIds.has(q.questionId)}
                            onChange={() => toggleQuestion(q.questionId, b.id)}
                            className={styles.checkbox}
                          />
                          <span className={styles.questionText}>{q.question.text}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <div className={styles.assignedSection}>
          <h3 className={styles.sectionTitle}>
            {createMode
              ? 'Selecione Questões para o Novo Banco'
              : 'Questões Selecionadas'}
          </h3>
          <ul className={styles.assignedList}>
            {assigned.length ? (
              assigned.map(q => (
                <li key={q.id} className={styles.questionItem}>
                  <label className={styles.questionLabel}>
                    <input
                      type="checkbox"
                      checked
                      disabled={viewMode}
                      onChange={() => toggleQuestion(q.id)}
                      className={styles.checkbox}
                    />
                    <span className={styles.questionText}>{q.text}</span>
                  </label>
                </li>
              ))
            ) : (
              <li className={styles.emptyMessage}>Nenhuma questão selecionada.</li>
            )}
          </ul>
        </div>

        {(createMode || editMode) && (
          <div className={styles.availableSection}>
            <h3 className={styles.sectionTitle}>Questões Disponíveis</h3>
            <ul className={styles.availableList}>
              {available.length ? (
                available.map(q => (
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
                ))
              ) : (
                <li className={styles.emptyMessage}>Não há questões disponíveis.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </BaseModal>
  )
}
