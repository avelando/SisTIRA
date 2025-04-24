'use client'

import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { getQuestions, createQuestion, updateQuestion, deleteQuestion } from '@/api/questions';
import QuestionModal from '@/components/modals/QuestionModal';
import styles from '@/styles/Questions.module.css';

export default function Questions() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);

  async function load() {
    try {
      const data = await getQuestions();
      setQuestions(data);
    } catch (error) {
      console.error('Erro ao listar questões:', error);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedQuestion(null);
    setModalVisible(true);
  };

  const openEditModal = (question: any) => {
    setModalMode('edit');
    setSelectedQuestion(question);
    setModalVisible(true);
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (modalMode === 'create') {
        await createQuestion({
          text: formData.text,
          questionType: formData.questionType,
          disciplines: formData.disciplines,
          alternatives: formData.alternatives,
        });
      } else if (modalMode === 'edit' && formData.id) {
        await updateQuestion(formData.id, {
          text: formData.text,
          questionType: formData.questionType,
          disciplines: formData.disciplines,
          alternatives: formData.alternatives,
        });
      }

      await load();
      setModalVisible(false);
    } catch (error: any) {
      alert(error.message || 'Erro ao salvar questão.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar esta questão?')) return;

    try {
      await deleteQuestion(id.toString());
      setQuestions(prev => prev.filter(q => q.id !== id));
    } catch (error: any) {
      console.error('Erro ao deletar questão:', error);
      alert(error.message || 'Falha ao deletar questão.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.filterIconContainer}><FaFilter /></div>
        <div className={styles.addIconContainer} onClick={openCreateModal}>
          + Adicionar questão
        </div>
      </div>

      {questions.map(question => (
        <div className={styles.questionCard} key={question.id}>
          <div className={styles.questionText}>{question.text}</div>
          <div className={styles.alternatives}>
            {question.alternatives?.map((alt: any, i: number) => (
              <div key={i} className={styles.alternativeItem}>
                <input type="radio" checked={alt.correct} readOnly />
                <span>{alt.content}</span>
              </div>
            ))}
          </div>
          <hr className={styles.separator} />
          <div className={styles.cardFooter}>
            <div className={styles.footerInfo}>
              <strong>Disciplina:</strong>
              <div className={styles.chipsContainer}>
                {question.questionDisciplines?.length
                  ? question.questionDisciplines.map((qd: any) => (
                      <span key={qd.discipline.id} className={styles.chip}>
                        {qd.discipline.name}
                      </span>
                    ))
                  : <span className={styles.chipEmpty}>---</span>
                }
              </div>
            </div>
            <div className={styles.actions}>
              <button className={styles.editButton} onClick={() => openEditModal(question)}>
                ✏ Editar
              </button>
              <button className={styles.deleteButton} onClick={() => handleDelete(question.id)}>
                🗑 Deletar
              </button>
            </div>
          </div>
        </div>
      ))}

      <QuestionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        question={selectedQuestion}
      />
    </div>
  );
}
