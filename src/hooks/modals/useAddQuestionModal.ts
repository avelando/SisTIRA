// src/hooks/modals/useAddQuestionsModal.ts
import { useState, useEffect } from 'react'
import { getExam, addQuestionsToExam } from '@/api/exams'
import { getQuestionBanks } from '@/api/questionsBank'
import { getQuestions }     from '@/api/questions'
import type { FullExam }    from '@/interfaces/ExamsProps'

/** Representação de um banco no modal */
interface Bank {
  id: string
  name: string
  questions: Array<{ id: string; text: string }>
}

export interface UseAddQuestionsModalOptions {
  examId: string
  onAdded: (updated: FullExam) => void
}

export function useAddQuestionsModal({
  examId,
  onAdded,
}: UseAddQuestionsModalOptions) {
  const [banks, setBanks]                       = useState<Bank[]>([])
  const [available, setAvailable]               = useState<Array<{ id: string; text: string }>>([])
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(new Set())
  const [expandedBanks, setExpandedBanks]       = useState<Set<string>>(new Set())
  const [loading, setLoading]                   = useState(false)

  useEffect(() => {
    ;(async () => {
      // 1) Busca todos os bancos do usuário
      const rawBanks = await getQuestionBanks()
      // rawBanks: Array<{ id: string; name: string; questions: { id: string; text: string }[] }>

      // 2) Mapeia pro nosso tipo Bank
      const allBanks: Bank[] = rawBanks.map((bank: { id: string; name: string; questions: Array<{ id: string; text: string }> }) => ({
        id: bank.id,
        name: bank.name,
        questions: bank.questions.map((q: { id: string; text: string }) => ({
          id: q.id,
          text: q.text,
        })),
      }))

      // 3) Busca o exame para saber quais bancos já estão vinculados
      const exam: FullExam = await getExam(examId)
      const linkedBankIds = new Set<string>(
        exam.examQuestionBanks.map((b) => b.questionBank.id)
      )

      // 4) Define o array de bancos (todos), mas você pode usar linkedBankIds
      //    para marcar checks pré-selecionados no UI, se quiser.
      setBanks(allBanks)

      // 5) Busca todas as questões “avulsas”
      const rawQs = await getQuestions()
      // rawQs: Array<{ id: string; text: string }>

      // 6) Filtra para tirar do “Sem Banco” aquelas que já estão em algum banco
      const inAnyBank = allBanks.flatMap((bank) => bank.questions)
      const avail = rawQs.filter((q: { id: string; text: string }) =>
        !inAnyBank.some((x) => x.id === q.id)
      )
      setAvailable(avail)

      // 7) Limpa seleções anteriores
      setSelectedQuestionIds(new Set())
      setExpandedBanks(new Set())
    })()
  }, [examId])

  /** Seleciona/deseleciona todas as questões de um banco */
  function toggleBank(bankId: string) {
    const next = new Set(selectedQuestionIds)
    const bank = banks.find((b) => b.id === bankId)
    bank?.questions.forEach((q: { id: string; text: string }) => {
      if (next.has(q.id)) next.delete(q.id)
      else next.add(q.id)
    })
    setSelectedQuestionIds(next)
  }

  /** Seleciona/deseleciona uma questão específica */
  function toggleQuestion(qid: string) {
    const next = new Set(selectedQuestionIds)
    if (next.has(qid)) next.delete(qid)
    else next.add(qid)
    setSelectedQuestionIds(next)
  }

  /** Abre/fecha o corpo de um banco no modal */
  function toggleExpandBank(bankId: string) {
    const next = new Set(expandedBanks)
    if (next.has(bankId)) next.delete(bankId)
    else next.add(bankId)
    setExpandedBanks(next)
  }

  /** Habilita botão “Adicionar” somente se houver seleção */
  function hasChanges() {
    return selectedQuestionIds.size > 0
  }

  /** Dispara a chamada à API para associar à prova */
  async function handleSave() {
    setLoading(true)
    try {
      const updated = await addQuestionsToExam(
        examId,
        Array.from(selectedQuestionIds)
      )
      onAdded(updated)
    } finally {
      setLoading(false)
    }
  }

  return {
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
  }
}
