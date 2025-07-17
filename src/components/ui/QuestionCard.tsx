'use client'

import React, { useState } from 'react'
import {
  Edit,
  Trash2,
  CheckCircle,
  Circle,
  BookOpen,
  Target,
  GraduationCap,
} from 'lucide-react'
import { Question } from '@/interfaces/QuestionProps'
import styles from '@/styles/QuestionCardV2.module.css'

interface QuestionCardProps {
  question: Question & {
    questionDisciplines?: { discipline: { id: string; name: string } }[]
    educationLevel?: string
    difficulty?: string
    examReference?: string
    useModelAnswers?: boolean
    createdAt?: string
    modelAnswers?: { id?: string; type: string; content: string }[]
  }
  index: number
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  onEdit,
  onDelete,
}) => {
  const [showActions, setShowActions] = useState(false)

  const truncate = (text: string, len = 150) =>
    text.length > len ? text.slice(0, len) + '...' : text

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit(question.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Tem certeza que deseja deletar esta questão?')) {
      onDelete(question.id)
    }
  }

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={styles.header}>
        <span
          className={
            question.questionType === 'OBJ'
              ? `${styles.badge} ${styles.badgeObj}`
              : `${styles.badge} ${styles.badgeSubj}`
          }
        >
          {index + 1}.{' '}
          {question.questionType === 'OBJ' ? 'Objetiva' : 'Subjetiva'}
        </span>
        <div
          className={`${styles.actions} ${
            showActions ? styles.actionsVisible : ''
          }`}
        >
          <button
            onClick={handleEdit}
            title="Editar"
            className={`${styles.actionButton} ${styles.editButton}`}
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

      <div className={styles.textWrapper}>
        <p className={styles.text}>{truncate(question.text)}</p>
      </div>

      {question.questionDisciplines?.length ? (
        <div className={styles.disciplines}>
          {question.questionDisciplines.map((qd) => (
            <span key={qd.discipline.id} className={styles.disciplineBadge}>
              {qd.discipline.name}
            </span>
          ))}
        </div>
      ) : null}

      <div className={styles.meta}>
        {question.educationLevel && (
          <div className={styles.metaItem}>
            <GraduationCap size={14} />
            <span>{question.educationLevel}</span>
          </div>
        )}
        {question.difficulty && (
          <div className={styles.metaItem}>
            <Target size={14} />
            <span>{question.difficulty}</span>
          </div>
        )}
        {question.examReference && (
          <div className={styles.metaItem}>
            <BookOpen size={14} />
            <span>{question.examReference}</span>
          </div>
        )}
      </div>

      {question.questionType === 'OBJ' && question.alternatives?.length ? (
        <div className={styles.alternativesSection}>
          <h4 className={styles.altHeader}>Alternativas:</h4>
          {question.alternatives.slice(0, 3).map((alt, i) => (
            <div key={i} className={styles.alternativeItem}>
              {alt.correct ? (
                <CheckCircle className={styles.correctIcon} size={16} />
              ) : (
                <Circle className={styles.wrongIcon} size={16} />
              )}
              <span
                className={
                  alt.correct
                    ? `${styles.altText} ${styles.altTextCorrect}`
                    : `${styles.altText} ${styles.altTextWrong}`
                }
              >
                {alt.content}
              </span>
            </div>
          ))}
          {question.alternatives.length > 3 && (
            <p className={styles.moreAlts}>
              +{question.alternatives.length - 3} alternativas
            </p>
          )}
        </div>
      ) : null}

      {question.questionType === 'SUB' &&
      question.useModelAnswers &&
      question.modelAnswers?.length ? (
        <div className={styles.modelAnswersSection}>
          <h4 className={styles.modelHeader}>Respostas Modelo:</h4>
          {question.modelAnswers.slice(0, 2).map((ans, i) => (
            <div key={ans.id ?? i} className={styles.modelItem}>
              <span className={styles.modelType}>{ans.type}:</span>
              <p className={styles.modelContent}>
                {truncate(ans.content, 100)}
              </p>
            </div>
          ))}
          {question.modelAnswers.length > 2 && (
            <p className={styles.moreModels}>
              +{question.modelAnswers.length - 2} respostas
            </p>
          )}
        </div>
      ) : null}

      {question.createdAt && (
        <div className={styles.created}>
          Criada em {new Date(question.createdAt).toLocaleDateString('pt-BR')}
        </div>
      )}
    </div>
  )
}
