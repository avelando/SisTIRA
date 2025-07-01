import QuestionCard from './QuestionCard'
import EmptyQuestions from './EmptyQuestions'
import { Question } from '@/interfaces/QuestionProps'
import { useState } from 'react'

interface QuestionListProps {
  questions: Question[]
  showAdd: boolean
  showExisting: boolean
  onAddNew: () => void
  onOpenExisting: () => void
  onRemove: (id: string) => void
  onChangeNew: (q: Partial<Question>) => void
  onAddQuestion: () => void
  onUpdateOption: (idx: number, v: string) => void
  newQuestion: Partial<Question>
}

export default function QuestionList({
  questions,
  showAdd,
  onAddNew,
  onRemove,
}: QuestionListProps) {

  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false)
  
  return (
    <>
      {questions.length > 0 ? (
        questions.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={idx}
            onRemove={onRemove}
          />
        ))
      ) : (
        !showAdd && (
          <EmptyQuestions onAddNew={onAddNew} />
        )
      )}
    </>
  )
}
