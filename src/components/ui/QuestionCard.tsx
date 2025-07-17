import React, { useState } from 'react';
import {
  Edit,
  Trash2,
  CheckCircle,
  Circle,
  BookOpen,
  Target,
  GraduationCap,
} from 'lucide-react';
import styles from '@/styles/QuestionCard.module.css';
import { Question } from '@/interfaces/QuestionProps';

interface QuestionCardProps {
  question: Question & Partial<{
    questionDisciplines: { discipline: { id: string; name: string } }[];
    educationLevel: string;
    difficulty: string;
    examReference: string;
    useModelAnswers: boolean;
    modelAnswers: { id?: string; type: string; content: string }[];
    alternatives: { content: string; correct: boolean }[];
    createdAt: string;
  }>;
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onEdit,
  onDelete,
}) => {
  const [showActions, setShowActions] = useState(false);

  const truncate = (text: string, len = 150) =>
    text.length > len ? text.slice(0, len) + '...' : text;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(question);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Tem certeza que deseja deletar esta questão?')) {
      onDelete(question.id);
    }
  };

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={styles.cardHeader}>
        <span
          className={`${styles.typeBadge} ${
            question.questionType === 'OBJ'
              ? styles.objectiveBadge
              : styles.subjectiveBadge
          }`}
        >
          {question.questionType === 'OBJ' ? 'Objetiva' : 'Subjetiva'}
        </span>
        <div
          className={`${styles.actions} ${showActions ? styles.actionsVisible : ''}`}
        >
          <button
            onClick={handleEdit}
            title="Editar"
            className={styles.actionButton}
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDelete}
            title="Deletar"
            className={`${styles.actionButton} ${styles.deleteButton}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className={styles.contentSection}>
        <p className={styles.contentText}>{truncate(question.text)}</p>
      </div>

      {question.questionDisciplines?.length ? (
        <div className={styles.disciplinesWrapper}>
          {question.questionDisciplines.map(qd => (
            <span
              key={qd.discipline.id}
              className={styles.disciplineBadge}
            >
              {qd.discipline.name}
            </span>
          ))}
        </div>
      ) : null}

      <div className={styles.metaWrapper}>
        {question.educationLevel && (
          <div className={styles.metaItem}>
            <GraduationCap size={14} /> <span>{question.educationLevel}</span>
          </div>
        )}
        {question.difficulty && (
          <div className={styles.metaItem}>
            <Target size={14} /> <span>{question.difficulty}</span>
          </div>
        )}
        {question.examReference && (
          <div className={styles.metaItem}>
            <BookOpen size={14} /> <span>{question.examReference}</span>
          </div>
        )}
      </div>

      {question.questionType === 'OBJ' && question.alternatives?.length ? (
        <div className={styles.alternativesWrapper}>
          <h4 className={styles.sectionTitle}>Alternativas:</h4>
          {question.alternatives.slice(0, 3).map((alt, i) => (
            <div key={i} className={styles.alternativeItem}>
              {alt.correct ? (
                <CheckCircle size={16} className={styles.alternativeIconCorrect} />
              ) : (
                <Circle size={16} className={styles.alternativeIcon} />
              )}
              <span
                className={
                  alt.correct ? styles.alternativeTextCorrect : styles.alternativeText
                }
              >
                {alt.content}
              </span>
            </div>
          ))}
          {question.alternatives.length > 3 && (
            <p className={styles.moreAlternatives}>
              +{question.alternatives.length - 3} alternativas
            </p>
          )}
        </div>
      ) : null}

      {question.questionType === 'SUB' &&
      question.useModelAnswers &&
      question.modelAnswers?.length ? (
        <div className={styles.modelAnswersWrapper}>
          <h4 className={styles.sectionTitle}>Respostas Modelo:</h4>
          {question.modelAnswers.slice(0, 2).map(ans => (
            <div key={ans.id} className={styles.modelAnswerItem}>
              <span className={styles.modelAnswerType}>{ans.type}:</span>
              <p className={styles.modelAnswerContent}>
                {truncate(ans.content, 100)}
              </p>
            </div>
          ))}
          {question.modelAnswers.length > 2 && (
            <p className={styles.moreAnswers}>
              +{question.modelAnswers.length - 2} respostas
            </p>
          )}
        </div>
      ) : null}

      {question.createdAt && (
        <div className={styles.createdAt}>
          Criada em {new Date(question.createdAt).toLocaleDateString('pt-BR')}
        </div>
      )}
    </div>
  );
};
