'use client'

import { Question } from '@/interfaces/QuestionProps'
import QuestionCard from './QuestionCard'
import EmptyQuestions from './EmptyQuestions'

interface QuestionListProps {
  questions: Question[]
  showExisting: boolean
  onOpenExisting: () => void
  onRemove: (id: string) => void
  onEdit: (id: string) => void
}

export default function QuestionList({
  questions,
  showExisting,
  onOpenExisting,
  onRemove,
  onEdit,
}: QuestionListProps) {
  return (
    <div className="flex flex-col gap-4">
      {questions.length > 0 ? (
        questions.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={idx}
            onRemove={onRemove}
            onEdit={onEdit}
          />
        ))
      ) : (
        !showExisting && (
          <EmptyQuestions onOpen={onOpenExisting} />
        )
      )}
    </div>
  )
}
