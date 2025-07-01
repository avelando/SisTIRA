'use client'

import React from 'react'
import { BaseModal } from '@/components/ui/Modals/BaseModal'
import { useAddQuestionsModal } from '@/hooks/modals/useAddQuestionModal'
import type { FullExam } from '@/interfaces/ExamsProps'

export interface AddQuestionsModalProps {
  visible: boolean
  examId: string
  onClose: () => void
  onAdded: (updatedExam: FullExam) => void
}

export default function AddQuestionsModal({
  visible,
  examId,
  onClose,
  onAdded,
}: AddQuestionsModalProps) {
  const {
    banks,
    available,
    selectedQuestionIds,
    expandedBanks,
    toggleBank,
    toggleQuestion,
    toggleExpandBank,
    hasChanges,
    loading,
    handleSave,
  } = useAddQuestionsModal({ examId, onAdded })

  if (!visible) return null

  return (
    <BaseModal
      visible={visible}
      title="Adicionar Questões à Prova"
      onClose={onClose}
      onSave={handleSave}
      saveLabel="Adicionar"
      saveLoading={loading}
      disableSave={!hasChanges()}
      maxWidthClass="max-w-4xl"
    >
      <div className="space-y-4">
        {banks.map((bank) => (
          <div key={bank.id} className="bg-gray-100 rounded-lg overflow-hidden">
            <div
              className="flex items-center justify-between px-4 py-2 bg-white cursor-pointer"
              onClick={() => toggleExpandBank(bank.id)}
            >
              <label className="flex items-center gap-2 flex-1 select-none">
                <input
                  type="checkbox"
                  checked={bank.questions.every((q) =>
                    selectedQuestionIds.has(q.id)
                  )}
                  onChange={() => toggleBank(bank.id)}
                  className="rounded border-gray-300 focus:ring-slate-900"
                />
                <span className="font-medium">{bank.name}</span>
              </label>
              <button
                className="text-gray-600"
                aria-label={
                  expandedBanks.has(bank.id) ? 'Recolher' : 'Expandir'
                }
              >
                {expandedBanks.has(bank.id) ? '▾' : '▸'}
              </button>
            </div>
            {expandedBanks.has(bank.id) && (
              <ul className="px-4 pb-3">
                {bank.questions.map((q) => (
                  <li
                    key={q.id}
                    className="flex items-center py-2 border-b border-gray-200 hover:bg-gray-50"
                  >
                    <label className="flex items-center gap-2 flex-1 select-none">
                      <input
                        type="checkbox"
                        checked={selectedQuestionIds.has(q.id)}
                        onChange={() => toggleQuestion(q.id)}
                        className="rounded border-gray-300 focus:ring-slate-900"
                      />
                      <span className="text-sm">{q.text}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {available.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="mb-2 font-semibold text-slate-900">Sem Banco</h3>
            <ul className="max-h-60 overflow-y-auto space-y-2">
              {available.map((q) => (
                <li
                  key={q.id}
                  className="flex items-center py-2 border-b border-gray-200 hover:bg-gray-50"
                >
                  <label className="flex items-center gap-2 flex-1 select-none">
                    <input
                      type="checkbox"
                      checked={selectedQuestionIds.has(q.id)}
                      onChange={() => toggleQuestion(q.id)}
                      className="rounded border-gray-300 focus:ring-slate-900"
                    />
                    <span className="text-sm">{q.text}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </BaseModal>
  )
}
