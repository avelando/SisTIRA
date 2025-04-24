import React, { useEffect, useState } from 'react';
import styles from '@/styles/modals/UnifiedModalStyles.module.css';
import {
  createQuestionBank,
  updateQuestionBank,
  addQuestionsToBank,
  removeQuestionsFromBank
} from '@/api/questionsBank';
import { getQuestions } from '@/api/questions';

import BaseModal from './BaseModal';

import { QuestionBankModalProps, QuestionSummary } from '@/interfaces/QuestionBankProps';

export default function QuestionBankModal({
  visible,
  onClose,
  onUpdated,
  mode,
  bank
}: QuestionBankModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [allQuestions, setAllQuestions] = useState<QuestionSummary[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const uniqueQuestions = Array.from(new Map(allQuestions.map(q => [q.id, q])).values());

  const isView = mode === 'view';

  useEffect(() => {
    if (!visible) return;

    if (!isView) getQuestions().then(setAllQuestions);

    if ((mode === 'edit' || isView) && bank) {
      setName(bank.name);
      setDescription(bank.description);
      setSelectedIds(bank.questions?.map(q => q.questionId) ?? []);
    } else {
      setName('');
      setDescription('');
      setSelectedIds([]);
    }
  }, [visible, mode, bank, isView]);

  if (!visible) return null;

  const toggleQuestion = (id: string) => {
    setSelectedIds(prev => (
      prev.includes(id)
        ? prev.filter(q => q !== id)
        : [...prev, id]
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isView || !onUpdated) return;

    if (mode === 'create') {
      await createQuestionBank({
        name,
        description,
        questions: selectedIds,
      });
    } else if (mode === 'edit' && bank) {
      await updateQuestionBank(bank.id, { name, description });

      const initialIds = bank.questions?.map(q => q.questionId) ?? [];
      const addedIds = selectedIds.filter(id => !initialIds.includes(id));
      const removedIds = initialIds.filter(id => !selectedIds.includes(id));

      if (addedIds.length) await addQuestionsToBank(bank.id, addedIds);
      if (removedIds.length) await removeQuestionsFromBank(bank.id, removedIds);
    }

    onUpdated();
  };

  const predominant = bank?.questionBankDisciplines
    ?.filter(d => d.isPredominant)
    .map(d => d.discipline.name) || [];

  return (
    <BaseModal
      visible={visible}
      title={
        mode === 'create'
          ? 'Criar Banco de Questões'
          : mode === 'edit'
          ? 'Editar Banco de Questões'
          : name
      }
      onClose={onClose}
      actions={!isView && (
        <>
          <button type="submit" form="question-bank-form" className={styles.button}>
            {mode === 'create' ? 'Criar' : 'Salvar'}
          </button>
        </>
      )}
    >
      <form id="question-bank-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={isView}
          required
          className={styles.title}
        />
        <textarea
          className={styles.description}
          placeholder="Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}
          disabled={isView}
        />
  
        {isView && predominant.length > 0 && (
          <div className={styles.tags}>
            {predominant.map(name => (
              <span key={name} className={styles.tag}>{name}</span>
            ))}
          </div>
        )}
  
        <div className={styles.questionSection}>
          <h3 className={styles.count}>
            {isView
              ? `Questões (${bank?.questions?.length ?? 0})`
              : 'Selecionar Questões'}
          </h3>
          <ul className={isView ? styles.questionGrid : styles.questionList}>
            {(isView ? bank?.questions ?? [] : uniqueQuestions).map((q: any) => {
              const questionId = isView ? q.questionId : q.id;
              const questionText = isView ? q.question.text : q.text;
  
              return (
                <li key={questionId} className={styles.questionCard}>
                  {!isView && (
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(questionId)}
                      onChange={() => toggleQuestion(questionId)}
                    />
                  )}
                  <span className={styles.questionText}>{questionText}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </form>
    </BaseModal>    
  );
}
