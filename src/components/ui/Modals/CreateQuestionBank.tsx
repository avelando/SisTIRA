'use client'

import React from 'react'
import { BaseModal } from '@/components/ui/Modals/BaseModal'
import { useExistingQuestionsModal, UseExistingQuestionsModalOptions } from '@/hooks/modals/useExistingQuestionsModal'

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
      <div className="space-y-6">
        {(createMode || editMode || viewMode) && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Nome</label>
              <input
                type="text"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                disabled={viewMode}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Descrição</label>
              <textarea
                value={formDescription}
                onChange={e => setFormDescription(e.target.value)}
                disabled={viewMode}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50 outline-none resize-none"
              />
            </div>
          </>
        )}

        {!createMode && !editMode && !viewMode && (
          <div className="space-y-3">
            {banks.map(b => (
              <div key={b.id} className="bg-gray-100 rounded-lg shadow overflow-hidden">
                <div
                  className="flex items-center justify-between px-4 py-3 bg-white cursor-pointer"
                  onClick={() => toggleExpandBank(b.id)}
                >
                  <label className="flex items-center gap-2 flex-1 select-none">
                    <input
                      type="checkbox"
                      checked={selectedBankIds.has(b.id)}
                      onChange={() => toggleBank(b.id)}
                      className="rounded border-gray-300 focus:ring-slate-900"
                    />
                    <span className="font-semibold">{b.name}</span>
                  </label>
                  <button
                    className="text-gray-600 text-lg hover:scale-125"
                    aria-label={expandedBanks.has(b.id) ? 'Recolher' : 'Expandir'}
                  >
                    {expandedBanks.has(b.id) ? '▾' : '▸'}
                  </button>
                </div>
                {expandedBanks.has(b.id) && (
                  <ul className="px-4 pb-3">
                    {b.questions?.map(q => (
                      <li
                        key={q.questionId}
                        className="flex items-center py-2 border-b border-gray-200 hover:bg-gray-50"
                      >
                        <label className="flex items-center gap-2 flex-1 select-none">
                          <input
                            type="checkbox"
                            checked={selectedQuestionIds.has(q.questionId)}
                            onChange={() => toggleQuestion(q.questionId, b.id)}
                            className="rounded border-gray-300 focus:ring-slate-900"
                          />
                          <span className="text-sm">{q.question.text}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="bg-yellow-50 border-l-4 border-yellow-300 rounded p-4">
          <h3 className="mb-2 text-sm font-semibold text-yellow-800">
            {createMode
              ? 'Selecione Questões para o Novo Banco'
              : 'Questões Selecionadas'}
          </h3>
          <ul className="max-h-64 overflow-y-auto space-y-2">
            {assigned.length ? (
              assigned.map(q => (
                <li
                  key={q.id}
                  className="flex items-center py-2 border-b border-gray-200 hover:bg-gray-50"
                >
                  <label className="flex items-center gap-2 flex-1 select-none">
                    <input
                      type="checkbox"
                      checked
                      disabled={viewMode}
                      onChange={() => toggleQuestion(q.id)}
                      className="rounded border-gray-300 focus:ring-slate-900"
                    />
                    <span className="text-sm">{q.text}</span>
                  </label>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500">Nenhuma questão selecionada.</li>
            )}
          </ul>
        </div>

        {(createMode || editMode) && (
          <div className="bg-white border border-slate-200 rounded p-4">
            <h3 className="mb-2 text-sm font-semibold text-slate-900">
              Questões Disponíveis
            </h3>
            <ul className="max-h-64 overflow-y-auto space-y-2">
              {available.length ? (
                available.map(q => (
                  <li
                    key={q.id}
                    className="flex items-center py-2 border-b border-gray-200 hover:bg-gray-50"
                  >
                    <label className="flex items-center gap-2 flex-1 select-none">
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => toggleQuestion(q.id)}
                        className="rounded border-gray-300 focus:ring-slate-900"
                      />
                      <span className="text-sm">{q.text}</span>
                    </label>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500">Não há questões disponíveis.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </BaseModal>
  )
}