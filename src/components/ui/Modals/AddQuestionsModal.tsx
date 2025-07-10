'use client'

import React from 'react'
import { BaseModal } from '@/components/ui/Modals/BaseModal'
import {
  useAddQuestionModal,
  UseAddQuestionModalOptions,
} from '@/hooks/modals/useAddQuestionModal'

export default function AddQuestionModal(
  props: UseAddQuestionModalOptions
) {
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
      {/* wrapper de conteúdo com altura fixa e rolagem quando necessário */}
      <div className="h-[70vh] overflow-y-auto space-y-6 px-4 pb-6">
        {(createMode || editMode || viewMode) && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Nome
              </label>
              <input
                type="text"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                disabled={viewMode}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Descrição
              </label>
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
          <div className="space-y-4">
            {banks.map(bank => (
              <div
                key={bank.id}
                className="rounded-lg shadow overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-3 bg-white">
                  <label className="flex items-center gap-2 flex-1 select-none">
                    <input
                      type="checkbox"
                      checked={selectedBankIds.has(bank.id)}
                      onChange={e => {
                        e.stopPropagation()
                        toggleBank(bank.id)
                      }}
                      className="rounded border-gray-300 focus:ring-slate-900"
                    />
                    <span className="font-semibold">{bank.name}</span>
                  </label>

                  <button
                    onClick={e => {
                      e.stopPropagation()
                      toggleExpandBank(bank.id)
                    }}
                    className="cursor-pointer text-gray-600 text-lg hover:scale-125 p-2"
                    aria-label={
                      expandedBanks.has(bank.id) ? 'Recolher' : 'Expandir'
                    }
                  >
                    {expandedBanks.has(bank.id) ? '▾' : '▸'}
                  </button>
                </div>

                {expandedBanks.has(bank.id) && (
                  <ul className="px-4 pb-3 space-y-1">
                    {bank.questions?.map(qb => (
                      <li
                        key={qb.questionId}
                        className="flex items-center py-2 border-b border-gray-200 hover:bg-gray-50"
                      >
                        <label className="flex items-center gap-2 flex-1 select-none">
                          <input
                            type="checkbox"
                            checked={selectedQuestionIds.has(qb.questionId)}
                            onChange={() => toggleQuestion(qb.questionId)}
                            className="rounded border-gray-300 focus:ring-slate-900"
                          />
                          <span className="text-sm">{qb.question.text}</span>
                        </label>
                      </li>
                    ))}
                    {bank.questions?.length === 0 && (
                      <li className="text-sm text-gray-500">
                        Nenhuma questão neste banco.
                      </li>
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {(createMode || editMode) && (
          <div className="bg-white border border-slate-200 rounded p-4">
            <h3 className="mb-2 text-sm font-semibold text-slate-900">
              Questões Disponíveis
            </h3>
            <ul className="max-h-64 overflow-y-auto space-y-2">
              {available.map(q => (
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
              ))}
              {available.length === 0 && (
                <li className="text-sm text-gray-500">
                  Não há questões disponíveis.
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </BaseModal>
  )
}
