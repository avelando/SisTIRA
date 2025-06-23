import QuestionCard from './QuestionCard'
import EmptyQuestions from './EmptyQuestions'
import NewQuestionModal from './NewQuestionModal'
import { Question } from '@/interfaces/QuestionProps'

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
  showExisting,
  onAddNew,
  onOpenExisting,
  onRemove,
  onChangeNew,
  onAddQuestion,
  onUpdateOption,
  newQuestion,
}: QuestionListProps) {
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
          <EmptyQuestions onAddNew={onAddNew} onOpenBank={onOpenExisting} />
        )
      )}

      <NewQuestionModal
        visible={showAdd}
        question={newQuestion}
        onChangeQuestion={onChangeNew}
        onAdd={onAddQuestion}
        onClose={() => onChangeNew({ ...newQuestion, text: '', alternatives: newQuestion.alternatives })}
        onUpdateOption={onUpdateOption}
      />
    </>
  )
}
