'use client'

import { useState, useEffect, useCallback } from 'react'
import type {
  ExistingQuestionsModalProps,
  Question as QuestionUI,
} from '@/interfaces/QuestionProps'
import type { QuestionBankProps } from '@/interfaces/QuestionBankProps'
import { getQuestions } from '@/api/questions'
import {
  getQuestionBanks,
  getQuestionBank,
} from '@/api/questionsBank'
import {
  getExam,
  addBanksToExam,
  removeBanksFromExam,
  addQuestionsToExam,
  removeQuestionsFromExam,
} from '@/api/exams'

export interface UseAddQuestionModalOptions
  extends ExistingQuestionsModalProps {
  createMode?: boolean
  editMode?: boolean
  viewMode?: boolean
  bankId?: string
  onCreated?: (newBank: QuestionBankProps) => void
  onUpdated?: (updatedBank: QuestionBankProps) => void
}

type BankQuestion = QuestionBankProps['questions'] extends Array<infer U> ? U : never

export function useAddQuestionModal({
  visible,
  examId,
  currentBankIds = [],
  currentQuestionIds = [], 
  onClose,
  onAdded,
  createMode = false,
  editMode = false,
  viewMode = false,
  bankId,
}: UseAddQuestionModalOptions) {
  const isAssociationMode = !createMode && !editMode && !viewMode

  const [banks, setBanks] = useState<QuestionBankProps[]>([])
  const [allQuestions, setAllQuestions] = useState<QuestionUI[]>([])
  const [selectedBankIds, setSelectedBankIds] = useState<Set<string>>(new Set())
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(new Set())
  const [formName, setFormName] = useState<string>('')
  const [formDescription, setFormDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!visible) return

    ;(async () => {
      if (createMode) {
        setFormName('')
        setFormDescription('')
        setSelectedQuestionIds(new Set())
        const qs = await getQuestions()
        setAllQuestions(qs)

      } else if (editMode || viewMode) {
        if (!bankId) return
        const bank = await getQuestionBank(bankId)
        setFormName(bank.name)
        setFormDescription(bank.description)

        const inBank: QuestionUI[] = (bank.questions || []).map(
          (qb: BankQuestion) => qb.question
        )
        setAllQuestions(inBank)
        setSelectedQuestionIds(new Set(inBank.map(q => q.id)))

      } else if (isAssociationMode) {
        const [exam, allBanks] = await Promise.all([
          getExam(examId),
          getQuestionBanks(),
        ])
        setBanks(allBanks)
        setSelectedBankIds(new Set(exam.examQuestionBanks.map(b => b.questionBank.id)))
        setSelectedQuestionIds(new Set(exam.allQuestions.map(q => q.id)))
      }
    })().catch(console.error)
  }, [
    visible,
    createMode,
    editMode,
    viewMode,
    bankId,
    examId,
    isAssociationMode,
  ])

  const updateSelections = useCallback((newQuestions: Set<string>) => {
    setSelectedQuestionIds(newQuestions)

    const newBanks = new Set<string>()
    banks.forEach(bank => {
      const bankQs = bank.questions?.map((qb: BankQuestion) => qb.questionId) ?? []
      if (bankQs.length > 0 && bankQs.every(qid => newQuestions.has(qid))) {
        newBanks.add(bank.id)
      }
    })
    setSelectedBankIds(newBanks)
  }, [banks])

  const toggleBank = useCallback((bId: string) => {
    if (!isAssociationMode) return
    const bank = banks.find(b => b.id === bId)
    if (!bank) return

    const bankQs = bank.questions?.map((qb: BankQuestion) => qb.questionId) ?? []
    const newQuestions = new Set(selectedQuestionIds)

    if (selectedBankIds.has(bId)) {
      bankQs.forEach(qId => newQuestions.delete(qId))
    } else {
      bankQs.forEach(qId => newQuestions.add(qId))
    }

    updateSelections(newQuestions)
  }, [isAssociationMode, banks, selectedBankIds, selectedQuestionIds, updateSelections])

  const toggleQuestion = useCallback((qId: string) => {
    if (!isAssociationMode) return
    const newQuestions = new Set(selectedQuestionIds)

    if (newQuestions.has(qId)) newQuestions.delete(qId)
    else newQuestions.add(qId)

    updateSelections(newQuestions)
  }, [isAssociationMode, selectedQuestionIds, updateSelections])

  const [expandedBanks, setExpandedBanks] = useState<Set<string>>(new Set())
  const toggleExpandBank = useCallback((bId: string) => {
    setExpandedBanks(prev => {
      const next = new Set(prev)
      prev.has(bId) ? next.delete(bId) : next.add(bId)
      return next
    })
  }, [])

  const assigned = allQuestions.filter(q => selectedQuestionIds.has(q.id))
  const available = allQuestions.filter(q => !selectedQuestionIds.has(q.id))

  const handleSave = useCallback(async () => {
    if (!isAssociationMode) {
      onClose()
      return
    }

    setLoading(true)
    try {
      const initBanks = new Set(currentBankIds)
      const initQuestions = new Set(currentQuestionIds)

      const toAddBanks = [...selectedBankIds].filter(id => !initBanks.has(id))
      const toRemoveBanks = currentBankIds.filter(id => !selectedBankIds.has(id))

      const toAddQuestions = [...selectedQuestionIds].filter(id => !initQuestions.has(id))
      const toRemoveQuestions = currentQuestionIds.filter(id => !selectedQuestionIds.has(id))

      if (toAddBanks.length)    await addBanksToExam(examId, toAddBanks)
      if (toRemoveBanks.length) await removeBanksFromExam(examId, toRemoveBanks)
      if (toAddQuestions.length)    await addQuestionsToExam(examId, toAddQuestions)
      if (toRemoveQuestions.length) await removeQuestionsFromExam(examId, toRemoveQuestions)

      const updated = await getExam(examId)
      onAdded?.(updated)
      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [
    isAssociationMode,
    examId,
    currentBankIds,
    currentQuestionIds,
    selectedBankIds,
    selectedQuestionIds,
    onAdded,
    onClose,
  ])

  const hasChanges = useCallback(() => {
    if (!isAssociationMode) return false

    if (selectedBankIds.size !== currentBankIds.length ||
        [...selectedBankIds].some(id => !currentBankIds.includes(id))) {
      return true
    }
    if (selectedQuestionIds.size !== currentQuestionIds.length ||
        [...selectedQuestionIds].some(id => !currentQuestionIds.includes(id))) {
      return true
    }
    return false
  }, [
    isAssociationMode,
    currentBankIds,
    currentQuestionIds,
    selectedBankIds,
    selectedQuestionIds,
  ])

  return {
    banks,
    allQuestions,
    assigned,
    available,
    selectedBankIds,
    selectedQuestionIds,
    expandedBanks,
    formName,
    formDescription,
    loading,

    createMode,
    editMode,
    viewMode,
    visible,

    setFormName,
    setFormDescription,
    toggleBank,
    toggleQuestion,
    toggleExpandBank,
    handleSave,
    hasChanges,
  }
}
