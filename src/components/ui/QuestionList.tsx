'use client'

import React from 'react'
import { QuestionListProps } from '@/interfaces/QuestionProps'
import { QuestionCard } from './QuestionCard'
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
          <QuestionCard
            key={q.id}
            question={q}
            index={idx}
            onDelete={onRemove}
            onEdit={onEdit}
          />
        ))
      ) : (
        !showExisting && <EmptyQuestions onOpen={onOpenExisting} />
      )}
    </div>
  )
}
