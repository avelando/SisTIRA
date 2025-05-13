import React, { useEffect, useState } from 'react';
import BaseModal from './BaseModal';
import { Question, ExistingQuestionsModalProps } from '@/interfaces/QuestionProps';
import { addQuestionsToExam, getExam, removeQuestionsFromExam } from '@/api/exams';
import api from '@/lib/axios';
import styles from '@/styles/modals/ExistingQuestionsModal.module.css';

export default function ExistingQuestionsModal({
  visible,
  examId,
  onClose,
  onAdded,
  currentQuestionIds
}: ExistingQuestionsModalProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setSelectedIds(new Set(currentQuestionIds));
    (async () => {
      try {
        const { data } = await api.get<Question[]>('/questions', { withCredentials: true });
        setQuestions(data);
      } catch (err) {
        console.error('Erro ao carregar questões:', err);
      }
    })();
  }, [visible]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleAdd = async () => {
    if (selectedIds.size === 0) return;
    setLoading(true);
    try {
      const initialSet = new Set(currentQuestionIds);
      const toAdd    = Array.from(selectedIds).filter(id => !initialSet.has(id));
      const toRemove = currentQuestionIds.filter(id => !selectedIds.has(id));

      if (toRemove.length) {
        await removeQuestionsFromExam(examId, toRemove);
      }

      if (toAdd.length) {
        await addQuestionsToExam(examId, toAdd);
      }

      const updated = await getExam(examId);
      
      onAdded(updated.allQuestions);
      setSelectedIds(new Set());
      onClose();
    } catch (err) {
      console.error('Erro ao adicionar questões:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal
      visible={visible}
      title="Adicionar Questões Existentes"
      onClose={onClose}
      actions={
        <>
          <button onClick={onClose} disabled={loading}>Cancelar</button>
          <button onClick={handleAdd} disabled={loading || selectedIds.size === 0}>
            {loading ? 'Adicionando…' : `Adicionar (${selectedIds.size})`}
          </button>
        </>
      }
    >
      <ul className={styles.list}>
        {questions.map(q => (
          <li key={q.id} className={styles.item}>
            <label>
              <input
                type="checkbox"
                checked={selectedIds.has(q.id)}
                onChange={() => toggleSelect(q.id)}
              />
              {q.text}
            </label>
          </li>
        ))}
      </ul>
    </BaseModal>
  );
}
