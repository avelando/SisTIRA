'use client'

import { useState, useEffect } from 'react'
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '@/api/questions'
import { Alternative, ModelAnswerWithId, Question } from '@/interfaces/QuestionProps'

type ModalMode = 'create' | 'edit'
const generateUniqueId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    questionType:   '',
    educationLevel: '',
    difficulty:     '',
    disciplineId:   '',
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [isModalOpen, setIsModalOpen]     = useState(false)
  const [modalMode, setModalMode]         = useState<ModalMode>('create')
  const [editingQuestion, setEditingQuestion] =
    useState<Question | null>(null)

  useEffect(() => {
    loadQuestions()
  }, [])

  async function loadQuestions() {
    setLoading(true)
    setError(null)
    try {
      const data = await getQuestions()
      setQuestions(data)
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar questões.')
    } finally {
      setLoading(false)
    }
  }

  function handleCreateClick() {
    setEditingQuestion(null)
    setModalMode('create')
    setIsModalOpen(true)
  }

  function handleEditClick(q: Question) {
    setEditingQuestion(q)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja deletar esta questão?')) return
    try {
      await deleteQuestion(id)
      setQuestions(prev => prev.filter(q => q.id !== id))
    } catch (err: any) {
      alert(err.message || 'Falha ao deletar questão.')
    }
  }

  const handleSubmit = async (data: {
    id?: string;
    text: string;
    questionType: 'OBJ' | 'SUB';
    disciplines: string[];
    useModelAnswers?: boolean;
    alternatives?: Alternative[];
    modelAnswers?: ModelAnswerWithId[];
  }) => {
    if (!data.id) {
      data.id = generateUniqueId();
    }

    console.log(data);
  };

  const filteredQuestions = questions.filter(q => {
    if (search && !q.text.toLowerCase().includes(search.toLowerCase()))
      return false
    if (filters.questionType && q.questionType !== filters.questionType)
      return false
    if (
      filters.disciplineId &&
      !q.questionDisciplines?.some(
        d => d.discipline.id === filters.disciplineId
      )
    )
      return false
    return true
  })

  const hasActiveFilters =
    !!search ||
    !!filters.questionType ||
    !!filters.educationLevel ||
    !!filters.difficulty ||
    !!filters.disciplineId

  return {
    questions,
    filteredQuestions,
    loading,
    error,
    search,
    setSearch,
    filters,
    setFilters,
    isFilterOpen,
    setIsFilterOpen,
    isModalOpen,
    setIsModalOpen,
    modalMode,
    editingQuestion,
    handleCreateClick,
    handleEditClick,
    handleDelete,
    handleSubmit,
    hasActiveFilters,
    loadQuestions,
  }
}
