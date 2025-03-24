import React from 'react';
import styles from '@/styles/QuestionBankModal.module.css';
import { ViewQuestionBankModalProps } from '@/interfaces/QuestionBankProps';

export default function ViewQuestionBankModal({ visible, bank, onClose }: ViewQuestionBankModalProps) {
  if (!visible || !bank) return null;

  const predominant = bank.questionBankDisciplines
    ?.filter(d => d.isPredominant)
    .map(d => d.discipline.name) || [];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>{bank.name}</h2>
          <button className={styles.close} onClick={onClose}>×</button>
        </header>

        <div className={styles.body}>
          <p className={styles.description}>{bank.description}</p>

          {predominant.length > 0 && (
            <div className={styles.tags}>
              {predominant.map(name => (
                <span key={name} className={styles.tag}>{name}</span>
              ))}
            </div>
          )}

          <h3 className={styles.count}>Questões ({bank.questions?.length || 0})</h3>
          <ul className={styles.questionGrid}>
            {bank.questions?.map(entry => (
              <li key={entry.questionId} className={styles.questionCard}>
                {entry.question.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
