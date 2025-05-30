import { FullExam, QuestionForResponse, ModelAnswer, ModelAnswerType } from "./ExamsProps";

export interface ModelAnswerWithId extends ModelAnswer {
  id?: string;
}

export interface QuestionModalProps {
  visible: boolean;
  mode: 'create' | 'edit';
  onClose: () => void;
  onSubmit: (data: {
    id?: string;
    text: string;
    questionType: 'OBJ' | 'SUB';
    disciplines: string[];
    useModelAnswers?: boolean;
    alternatives?: { content: string; correct: boolean }[];
    modelAnswers?: ModelAnswerWithId[];
  }) => void;
  question?: {
    id: string;
    text: string;
    questionType: 'OBJ' | 'SUB';
    questionDisciplines: { discipline: { id: string; name: string } }[];
    useModelAnswers?: boolean;
    alternatives?: { content: string; correct: boolean }[];
    modelAnswers?: ModelAnswerWithId[];
  };
}

export interface Question {
  id: string;
  text: string;
  questionType: 'OBJ' | 'SUB';
  alternatives?: { id: string; content: string }[];
  modelAnswers?: ModelAnswerWithId[];
  selectedOption?: string;
  answerText?: string;
}

export interface QuestionUI extends QuestionForResponse {
  selectedOption?: string;
  answerText?: string;
}

export interface ExistingQuestionsModalProps {
  visible: boolean;
  examId: string;
  currentBankIds: string[];
  currentQuestionIds: string[];
  onClose: () => void;
  onAdded: (updated: FullExam) => void;
}
