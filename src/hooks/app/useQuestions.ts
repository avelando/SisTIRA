'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '@/api/questions';
import {
  Alternative,
  ModelAnswerWithId,
  Question,
} from '@/interfaces/QuestionProps';

type ModalMode = 'create' | 'edit';

function matchesTypeFilter(qType: string, filter: string): boolean {
  if (!filter) return true;
  if (filter === 'OBJ') return qType !== 'SUBJECTIVE';
  if (filter === 'SUB') return qType === 'SUBJECTIVE';
  return qType === filter;
}

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    questionType: '',
    educationLevel: '',
    difficulty: '',
    disciplineId: '',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [editingQuestion, setEditingQuestion] =
    useState<Question | null>(null);

  const loadQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getQuestions();
      setQuestions(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar questões.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleCreateClick = () => {
    setEditingQuestion(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditClick = (q: Question) => {
    setEditingQuestion(q);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta questão?')) return;
    try {
      await deleteQuestion(id);
      setQuestions(prev => prev.filter(q => q.id !== id));
    } catch (err: any) {
      alert(err.message || 'Falha ao deletar questão.');
    }
  };

  const handleSubmit = useCallback(
    async (data: {
      id?: string;
      text: string;
      questionType: 'OBJ' | 'SUB';
      educationLevel?: string;
      difficulty?: string;
      examReference?: string;
      useModelAnswers?: boolean;
      disciplines: string[];
      alternatives?: Alternative[];
      modelAnswers?: ModelAnswerWithId[];
    }) => {
      setLoading(true);
      try {
        const { id, ...payload } = data;

        if (modalMode === 'create') {
          await createQuestion(payload);
        } else {
          await updateQuestion(id!, payload);
        }
        await loadQuestions();
        setIsModalOpen(false);
      } catch (err: any) {
        alert(err.message || 'Erro ao salvar questão.');
      } finally {
        setLoading(false);
      }
    },
    [modalMode, loadQuestions]
  );

  const filteredQuestions = questions.filter(q => {
    if (search && !q.text.toLowerCase().includes(search.toLowerCase())) return false;

    if (filters.questionType && !matchesTypeFilter(String(q.questionType), filters.questionType)) {
      return false;
    }

    if (
      filters.disciplineId &&
      !q.questionDisciplines?.some(d => d.discipline.id === filters.disciplineId)
    ) return false;

    return true;
  });

  const hasActiveFilters =
    !!search ||
    !!filters.questionType ||
    !!filters.educationLevel ||
    !!filters.difficulty ||
    !!filters.disciplineId;

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
  };
}
