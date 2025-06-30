'use client'

import { useState, useEffect, useCallback } from 'react'
import type {
  ExistingQuestionsModalProps,
  Question as QuestionUI,
} from '@/interfaces/QuestionProps'
import type { QuestionBankProps } from '@/interfaces/QuestionBankProps'
import { getQuestions } from '@/api/questions'
import api from '@/lib/axios'
import {
  getQuestionBank,
  createQuestionBank,
  updateQuestionBank,
  addQuestionsToBank,
  removeQuestionsFromBank as removeQuestionsFromBankAPI,
} from '@/api/questionsBank'
import {
  addBanksToExam,
  removeBanksFromExam,
  addQuestionsToExam,
  removeQuestionsFromExam,
  getExam,
} from '@/api/exams'
import type { AxiosResponse } from 'axios'

type BankQuestion = NonNullable<QuestionBankProps['questions']>[number]

export interface UseExistingQuestionsModalOptions
  extends ExistingQuestionsModalProps {
  createMode?: boolean
  editMode?: boolean
  viewMode?: boolean
  bankId?: string
  onCreated?: (newBank: QuestionBankProps) => void
  onUpdated?: (updatedBank: QuestionBankProps) => void
}

export function useExistingQuestionsModal({
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
  onCreated,
  onUpdated,
}: UseExistingQuestionsModalOptions) {
  const [banks, setBanks] = useState<QuestionBankProps[]>([])
  const [allQuestions, setAllQuestions] = useState<QuestionUI[]>([])
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(new Set())
  const [selectedBankIds, setSelectedBankIds] = useState<Set<string>>(new Set())
  const [expandedBanks, setExpandedBanks] = useState<Set<string>>(new Set())
  const [formName, setFormName] = useState<string>('')
  const [formDescription, setFormDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!visible) return
    ;(async () => {
      const qs = await getQuestions()
      setAllQuestions(qs)

      if (createMode) {
        setFormName('')
        setFormDescription('')
        setSelectedQuestionIds(new Set())
      } else if (editMode || viewMode) {
        if (!bankId) return
        const full = (await getQuestionBank(bankId)) as QuestionBankProps
        setFormName(full.name)
        setFormDescription(full.description)
        setSelectedQuestionIds(
          new Set(full.questions.map((q: BankQuestion) => q.questionId))
        )
      } else {
        const resp: AxiosResponse<QuestionBankProps[]> = await api.get(
          '/question-banks',
          { withCredentials: true }
        )
        setBanks(resp.data)
        setSelectedBankIds(new Set(currentBankIds))
        setSelectedQuestionIds(new Set(currentQuestionIds))
      }

      setExpandedBanks(new Set())
    })().catch(console.error)
  }, [
    visible,
    createMode,
    editMode,
    viewMode,
    bankId,
    currentBankIds,
    currentQuestionIds,
  ])

  const toggleBank = useCallback(
    (bId: string) => {
      setSelectedBankIds(prev => {
        const next = new Set(prev)
        const b = banks.find(x => x.id === bId)
        if (!b) return next

        if (next.has(bId)) {
          next.delete(bId)
          setSelectedQuestionIds(qs => {
            const n = new Set(qs)
            b.questions?.forEach((q: BankQuestion) => n.delete(q.questionId))
            return n
          })
        } else {
          next.add(bId)
          setSelectedQuestionIds(qs => {
            const n = new Set(qs)
            b.questions?.forEach((q: BankQuestion) => n.add(q.questionId))
            return n
          })
        }
        return next
      })
    },
    [banks],
  )

  const toggleQuestion = useCallback(
    (qId: string, bId?: string) => {
      setSelectedQuestionIds(prev => {
        const next = new Set(prev)
        next.has(qId) ? next.delete(qId) : next.add(qId)

        if (bId) {
          setSelectedBankIds(sb => {
            const nb = new Set(sb)
            const b = banks.find(x => x.id === bId)
            if (!b) return nb
            const total = b.questions?.length ?? 0
            const selCount =
              b.questions?.filter((q: BankQuestion) =>
                next.has(q.questionId)
              ).length ?? 0
            selCount === total ? nb.add(bId) : nb.delete(bId)
            return nb
          })
        }

        return next
      })
    },
    [banks],
  )

  const toggleExpandBank = useCallback((bId: string) => {
    setExpandedBanks(prev => {
      const next = new Set(prev)
      prev.has(bId) ? next.delete(bId) : next.add(bId)
      return next
    })
  }, [])

  const assigned = allQuestions.filter(q => selectedQuestionIds.has(q.id))
  const available = allQuestions.filter(q => !selectedQuestionIds.has(q.id))

  const hasChanges = useCallback(() => {
    if (viewMode) return false
    if (createMode) {
      return formName.trim().length > 0 && selectedQuestionIds.size > 0
    }
    if (editMode) {
      return formName.trim().length > 0 && selectedQuestionIds.size > 0
    }
    return (
      currentBankIds.length !== selectedBankIds.size ||
      currentBankIds.some(id => !selectedBankIds.has(id)) ||
      currentQuestionIds.length !== selectedQuestionIds.size ||
      currentQuestionIds.some(id => !selectedQuestionIds.has(id))
    )
  }, [
    viewMode,
    createMode,
    editMode,
    formName,
    selectedQuestionIds,
    selectedBankIds,
    currentBankIds,
    currentQuestionIds,
  ])

  const handleSave = useCallback(async () => {
    if (viewMode) {
      onClose()
      return
    }
    if (!hasChanges()) return
    setLoading(true)
    try {
      if (createMode) {
        const created = await createQuestionBank({
          name: formName,
          description: formDescription,
          questions: [],
        })
        if (selectedQuestionIds.size > 0) {
          await addQuestionsToBank(
            created.id,
            Array.from(selectedQuestionIds)
          )
        }
        const full = (await getQuestionBank(created.id)) as QuestionBankProps
        onCreated?.(full)

      } else if (editMode) {
        const bId = bankId as string
        await updateQuestionBank(bId, {
          name: formName,
          description: formDescription,
        })
        const before = (await getQuestionBank(bId)) as QuestionBankProps
        const beforeIds = new Set(
          before.questions.map((q: BankQuestion) => q.questionId)
        )
        const toAdd = Array.from(selectedQuestionIds).filter(
          id => !beforeIds.has(id)
        )
        const toRem = Array.from(beforeIds).filter(
          id => !selectedQuestionIds.has(id)
        )
        if (toAdd.length) await addQuestionsToBank(bId, toAdd)
        if (toRem.length) await removeQuestionsFromBankAPI(bId, toRem)
        const full = (await getQuestionBank(bId)) as QuestionBankProps
        onUpdated?.(full)

      } else {
        const initB = new Set(currentBankIds)
        const toAddB = Array.from(selectedBankIds).filter(
          id => !initB.has(id)
        )
        const toRemB = currentBankIds.filter(
          id => !selectedBankIds.has(id)
        )
        if (toAddB.length) await addBanksToExam(examId, toAddB)
        if (toRemB.length) await removeBanksFromExam(examId, toRemB)

        const initQ = new Set(currentQuestionIds)
        const toAddQ = Array.from(selectedQuestionIds).filter(
          id => !initQ.has(id)
        )
        const toRemQ = currentQuestionIds.filter(
          id => !selectedQuestionIds.has(id)
        )
        if (toAddQ.length) await addQuestionsToExam(examId, toAddQ)
        if (toRemQ.length) await removeQuestionsFromExam(examId, toRemQ)

        const upd = await getExam(examId)
        onAdded?.(upd)
      }
      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [
    viewMode,
    createMode,
    editMode,
    formName,
    formDescription,
    selectedQuestionIds,
    selectedBankIds,
    currentBankIds,
    currentQuestionIds,
    bankId,
    examId,
    onClose,
    onCreated,
    onUpdated,
    onAdded,
    hasChanges,
  ])

  return {
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
    createMode,
    editMode,
    viewMode,
    visible,
    toggleBank,
    toggleQuestion,
    toggleExpandBank,
    hasChanges,
    handleSave,
  }
}
