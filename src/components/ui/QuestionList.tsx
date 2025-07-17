'use client'

import React from 'react'
import { QuestionListProps } from '@/interfaces/QuestionProps'
import ExamQuestionCard from './ExamQuestionCard'
import EmptyQuestions from './EmptyQuestions'
import styles from '@/styles/QuestionList.module.css'

export default function QuestionList({
  questions,
  showExisting,
  onOpenExisting,
  onRemove,
  onEdit,
}: QuestionListProps) {
  return (
    <div className={styles.container}>
      {questions.length > 0 ? (
        questions.map((q, idx) => (
          <ExamQuestionCard
            key={q.id}
            question={q}
            index={idx}
            onRemove={onRemove}
            onEdit={onEdit}
          />
        ))
      ) : (
        !showExisting && <EmptyQuestions onOpen={onOpenExisting} />
      )}
    </div>
  )
}
