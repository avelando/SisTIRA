import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import styles from '@/styles/ExamQuestionCard.module.css';
import { Question } from '@/interfaces/QuestionProps';

interface ExamQuestionCardProps {
  question: Question;
  index: number;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function ExamQuestionCard({
  question,
  index,
  onRemove,
  onEdit,
}: ExamQuestionCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.info}>
          <div className={styles.index}>{index + 1}</div>
          <span className={styles.typeBadge}>
            {question.questionType === 'OBJ' ? 'Múltipla Escolha' : 'Dissertativa'}
          </span>
        </div>
        <div className={styles.actions}>
          <button
            onClick={() => onEdit(question.id)}
            title="Editar"
            className={styles.editButton}
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onRemove(question.id)}
            title="Deletar"
            className={styles.deleteButton}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className={styles.text}>{question.text}</p>

      {question.questionType === 'OBJ' && question.alternatives && (
        <ul className={styles.alternatives}>
          {question.alternatives.map((opt, i) => (
            <li key={i} className={styles.alternativeItem}>
              <div className={styles.bullet}>
                {String.fromCharCode(65 + i)}
              </div>
              <span className={styles.alternativeText}>{opt.content}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
