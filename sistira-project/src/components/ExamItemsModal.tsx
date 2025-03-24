import React, { useEffect, useState } from 'react';
import {
  addQuestionsToExam,
  removeQuestionsFromExam,
  addBanksToExam,
  removeBanksFromExam,
} from '@/pages/api/exams';
import { getQuestionBanks } from '@/pages/api/questionsBank';
import { getQuestions } from '@/pages/api/questions';
import styles from '@/styles/ExamModal.module.css';

interface ExamItemsModalProps {
  examId: string;
  exam: any;
  onClose: () => void;
}

export default function ExamItemsModal({ examId, exam, onClose }: ExamItemsModalProps) {
  const [banks, setBanks] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setBanks(await getQuestionBanks());
      setQuestions(await getQuestions());
    })();
  }, []);

  const toggleQuestion = async (qid: string) => {
    if (exam.questions.some((q: any) => q.question.id === qid)) {
      await removeQuestionsFromExam(examId, [qid]);
    } else {
      await addQuestionsToExam(examId, [qid]);
    }
  };  

  const toggleBank = async (bid: string) => {
    if (exam.questionBank?.id === bid) {
      await removeBanksFromExam(examId, [bid]);
    } else {
      await addBanksToExam(examId, [bid]);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>Adicionar Itens</h2>
          <button onClick={onClose}>×</button>
        </header>
        <div className={styles.body}>
          <section>
            <h3>Banco de Questões</h3>
            {banks.map(b => (
              <label key={b.id}>
                <input
                  type="checkbox"
                  checked={exam.questionBank?.id === b.id}
                  onChange={() => toggleBank(b.id)}
                />
                {b.name}
              </label>
            ))}
          </section>
          <section>
            <h3>Questões</h3>
            {questions.map(q => (
              <label key={q.id}>
                <input
                  type="checkbox"
                  checked={exam.questions.some((x: any) => x.question.id === q.id)}
                  onChange={() => toggleQuestion(q.id)}
                />
                {q.text}
              </label>
            ))}
          </section>
        </div>
        <div className={styles.modalActions}>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
