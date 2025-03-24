import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { getQuestions, deleteQuestion } from '@/pages/api/questions';
import Layout from '@/components/Layout';
import AddQuestionModal from '@/components/AddQuestionModal';
import EditQuestionModal from '@/components/EditQuestionModal';
import styles from '@/styles/Questions.module.css';

export default function Questions() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

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

  const handleCreated = () => {
    load();
    setShowAddModal(false);
  };

  const handleEditClick = (question: any) => {
    setSelectedQuestion(question);
    setShowEditModal(true);
  };

  const handleUpdated = () => {
    load();
    setShowEditModal(false);
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
        <div className={styles.addIconContainer} onClick={() => setShowAddModal(true)}>
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
              <button className={styles.editButton} onClick={() => handleEditClick(question)}>
                ✏ Editar
              </button>
              <button className={styles.deleteButton} onClick={() => handleDelete(question.id)}>
                🗑 Deletar
              </button>
            </div>
          </div>
        </div>
      ))}

      <AddQuestionModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreated={handleCreated}
      />

      <EditQuestionModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        onUpdated={handleUpdated}
        question={selectedQuestion}
      />
    </div>
  );
}

Questions.getLayout = (page: React.ReactElement) => (
  <Layout title="Questões">{page}</Layout>
);
