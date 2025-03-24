import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { getQuestions } from '@/pages/api/questions';
import Layout from '@/components/Layout';
import styles from '@/styles/Questions.module.css';
import AddQuestionModal from '@/components/AddQuestionModal';

export default function Questions() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.filterIconContainer}>
          <FaFilter />
        </div>
        <div className={styles.addIconContainer} onClick={() => setShowModal(true)}>
          + Adicionar questão
        </div>
      </div>

      {questions.map(question => {
        const disciplineNames =
          question.questionDisciplines
            ?.map((qd: any) => qd.discipline.name)
            .join('; ') || '---';

        return (
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
                <button className={styles.editButton}>✏ Editar</button>
                <button className={styles.deleteButton}>🗑 Deletar</button>
              </div>
            </div>
          </div>
        );
      })}

      <AddQuestionModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onCreated={handleCreated}
      />
    </div>
  );
}

Questions.getLayout = (page: React.ReactElement) => (
  <Layout title="Questões">
    {page}
  </Layout>
);
