import { FullExam, QuestionForResponse } from './ExamsProps'

export interface Discipline {
  id: string
  name: string
}

export interface QuestionsFilters {
  search: string
  questionType: string
  educationLevel: string
  difficulty: string
  disciplineId: string
}

export interface Alternative {
  content: string
  correct: boolean
}

export interface ModelAnswerWithId {
  id?: string
  type: string
  content: string
}

export interface Question {
  id: string
  text: string
  questionType: 'OBJ' | 'SUB'
  questionDisciplines?: { discipline: Discipline }[]
  educationLevel?: string
  difficulty?: string
  examReference?: string
  useModelAnswers?: boolean
  alternatives?: Alternative[]
  modelAnswers?: ModelAnswerWithId[]
  createdAt?: string
}

export interface QuestionModalProps {
  visible: boolean
  mode: 'create' | 'edit'
  onClose: () => void
  onSubmit: (data: {
    id?: string
    text: string
    questionType: 'OBJ' | 'SUB'
    disciplines: string[]
    useModelAnswers?: boolean
    alternatives?: Alternative[]
    modelAnswers?: ModelAnswerWithId[]
  }) => void
  question?: Question
  loading?: boolean
}

export interface QuestionUI extends QuestionForResponse {
  selectedOption?: string
  answerText?: string
}

export interface ExistingQuestionsModalProps {
  visible: boolean
  examId: string
  currentBankIds: string[]
  currentQuestionIds: string[]
  onClose: () => void
  onAdded: (updated: FullExam) => void
}
