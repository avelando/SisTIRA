'use client'

import { useState, useEffect, useCallback } from 'react'
import { QuestionModalProps } from '@/interfaces/QuestionProps'

export interface UseQuestionModalParams {
  question?: QuestionModalProps['question']
  mode: 'create' | 'edit'
  visible: boolean
  onClose: () => void
  onSuccess: QuestionModalProps['onSubmit']
  loading?: boolean
}

export function useQuestionModal({
  question,
  mode,
  visible,
  onClose,
  onSuccess,
  loading = false,
}: UseQuestionModalParams) {
  const [formData, setFormData] = useState<{
    id?: string
    text: string
    questionType: 'OBJ' | 'SUB'
    educationLevel: string
    difficulty: string
    examReference: string
    useModelAnswers: boolean
    disciplines: string[]
    alternatives: { content: string; correct: boolean }[]
    modelAnswers: { id?: string; type: string; content: string }[]
  }>({
    id: undefined,
    text: '',
    questionType: 'OBJ',
    educationLevel: '',
    difficulty: '',
    examReference: '',
    useModelAnswers: false,
    disciplines: [],
    alternatives: Array(4).fill({ content: '', correct: false }),
    modelAnswers: [],
  })

  useEffect(() => {
    if (question) {
      setFormData({
        id: question.id,
        text: question.text,
        questionType: question.questionType,
        educationLevel: question.educationLevel ?? '',
        difficulty: question.difficulty ?? '',
        examReference: question.examReference ?? '',
        useModelAnswers: question.useModelAnswers ?? false,
        disciplines:
          question.questionDisciplines?.map(qd => qd.discipline.name) ?? [],
        alternatives:
          question.alternatives?.map(a => ({
            content: a.content,
            correct: a.correct,
          })) ?? Array(4).fill({ content: '', correct: false }),
        modelAnswers:
          question.modelAnswers?.map(ma => ({
            id: ma.id,
            type: ma.type,
            content: ma.content,
          })) ?? [],
      })
    } else {
      setFormData({
        id: undefined,
        text: '',
        questionType: 'OBJ',
        educationLevel: '',
        difficulty: '',
        examReference: '',
        useModelAnswers: false,
        disciplines: [],
        alternatives: Array(4).fill({ content: '', correct: false }),
        modelAnswers: [],
      })
    }
  }, [question, mode, visible])

  const updateField = useCallback<
    <K extends keyof typeof formData>(field: K, value: typeof formData[K]) => void
  >((field, value) => {
    setFormData(fd => ({ ...fd, [field]: value }))
  }, [])

  const updateAlt = useCallback(
    (i: number, key: 'content' | 'correct', val: any) => {
      const newAlts = formData.alternatives.map((alt, idx) => {
        if (idx === i) return { ...alt, [key]: val }
        return key === 'correct' && val
          ? { ...alt, correct: false }
          : alt
      })
      updateField('alternatives', newAlts)
    },
    [formData.alternatives, updateField]
  )

  const addAlt = useCallback(() => {
    updateField('alternatives', [
      ...formData.alternatives,
      { content: '', correct: false },
    ])
  }, [formData.alternatives, updateField])

  const removeAlt = useCallback(
    (i: number) => {
      if (formData.alternatives.length > 2) {
        updateField(
          'alternatives',
          formData.alternatives.filter((_, idx) => idx !== i)
        )
      }
    },
    [formData.alternatives, updateField]
  )

  const updateModel = useCallback(
    (i: number, key: 'type' | 'content', val: string) => {
      const newModels = formData.modelAnswers.map((ma, idx) =>
        idx === i ? { ...ma, [key]: val } : ma
      )
      updateField('modelAnswers', newModels)
    },
    [formData.modelAnswers, updateField]
  )

  const addModel = useCallback(() => {
    updateField('modelAnswers', [
      ...formData.modelAnswers,
      { id: undefined, type: '', content: '' },
    ])
  }, [formData.modelAnswers, updateField])

  const removeModel = useCallback(
    (i: number) => {
      updateField(
        'modelAnswers',
        formData.modelAnswers.filter((_, idx) => idx !== i)
      )
    },
    [formData.modelAnswers, updateField]
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!formData.text.trim()) {
        alert('Insira o texto da questão.')
        return
      }
      if (
        formData.questionType === 'OBJ' &&
        !formData.alternatives.some(a => a.correct && a.content.trim())
      ) {
        alert('Marque uma alternativa correta.')
        return
      }

      onSuccess({
        id: formData.id,
        text: formData.text,
        questionType: formData.questionType,
        educationLevel: formData.educationLevel,
        difficulty: formData.difficulty,
        examReference: formData.examReference,
        useModelAnswers: formData.useModelAnswers,
        disciplines: formData.disciplines,
        alternatives: formData.alternatives,
        modelAnswers: formData.modelAnswers,
      })
      onClose()
    },
    [formData, onClose, onSuccess]
  )

  return {
    formData,
    loading,
    updateField,
    updateAlt,
    addAlt,
    removeAlt,
    updateModel,
    addModel,
    removeModel,
    handleSubmit,
  }
}
