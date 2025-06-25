import { useState, useEffect, useCallback } from 'react'
import { createQuestion, updateQuestion } from '@/api/questions'
import { QuestionModalProps } from '@/interfaces/QuestionProps'

type SuccessCallback = (data: any) => void

export function useQuestionModal({
  question,
  mode,
  visible,
  onClose,
  onSuccess,
}: Pick<QuestionModalProps, 'question' | 'mode' | 'visible'> & {
  onClose: () => void
  onSuccess: SuccessCallback
}) {
  const [formData, setFormData] = useState({
    id: question?.id,
    text: '',
    questionType: (question?.questionType ?? 'OBJ') as 'OBJ' | 'SUB',
    educationLevel: question?.educationLevel ?? '',
    difficulty: question?.difficulty ?? '',
    examReference: question?.examReference ?? '',
    useModelAnswers: question?.useModelAnswers ?? false,
    disciplines:
      (question?.questionDisciplines?.map(d => d.discipline.id) as string[]) ??
      [],
    alternatives:
      question?.alternatives ??
      Array(4).fill({ content: '', correct: false }),
    modelAnswers:
      (question?.modelAnswers as { id?: string; type: string; content: string }[]) ??
      [],
  })
  const [loading, setLoading] = useState(false)

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
          question.questionDisciplines?.map(qd => qd.discipline.id) ?? [],
        alternatives: question.alternatives ?? formData.alternatives,
        modelAnswers: question.modelAnswers ?? [],
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

  const updateField = useCallback(
    <K extends keyof typeof formData>(field: K, value: typeof formData[K]) => {
      setFormData(fd => ({ ...fd, [field]: value }))
    },
    []
  )

  const toggleDiscipline = useCallback(
    (id: string) => {
      updateField(
        'disciplines',
        formData.disciplines.includes(id)
          ? formData.disciplines.filter(d => d !== id)
          : [...formData.disciplines, id]
      )
    },
    [formData.disciplines, updateField]
  )

  const updateAlt = useCallback(
    (i: number, key: 'content' | 'correct', val: any) => {
      const alts = formData.alternatives.map((alt, idx) =>
        idx !== i
          ? key === 'correct' && val
            ? { ...alt, correct: false }
            : alt
          : { ...alt, [key]: val }
      )
      updateField('alternatives', alts)
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
      const mas = formData.modelAnswers.map((ma, idx) =>
        idx === i ? { ...ma, [key]: val } : ma
      )
      updateField('modelAnswers', mas)
    },
    [formData.modelAnswers, updateField]
  )

  const addModel = useCallback(() => {
    updateField('modelAnswers', [
      ...formData.modelAnswers,
      { type: '', content: '' },
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
    async (e: React.FormEvent) => {
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
      setLoading(true)
      try {
        let result: any
        if (mode === 'edit' && formData.id) {
          result = await updateQuestion(formData.id, formData)
        } else {
          result = await createQuestion(formData)
        }
        onSuccess(result)
        onClose()
      } catch (err: any) {
        alert(err.message || 'Erro ao salvar questão.')
      } finally {
        setLoading(false)
      }
    },
    [formData, mode, onClose, onSuccess]
  )

  return {
    formData,
    loading,
    updateField,
    toggleDiscipline,
    updateAlt,
    addAlt,
    removeAlt,
    updateModel,
    addModel,
    removeModel,
    handleSubmit,
  }
}
