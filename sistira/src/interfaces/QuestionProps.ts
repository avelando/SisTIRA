import { FullExam } from "./ExamsProps";

export interface QuestionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (questionData: any) => void;
  mode: 'create' | 'edit';
  question?: {
    id: number;
    text: string;
    questionType: 'OBJ' | 'SUB';
    questionDisciplines: { discipline: { id: number; name: string } }[];
    alternatives?: { content: string; correct: boolean }[];
  };
}

export interface ManualQuestionFormProps {
  onCancel: () => void;
  onSubmit: (data: {
    text: string;
    type: 'objetiva' | 'subjetiva';
    disciplines: string[];
    alternatives?: { content: string; correct: boolean }[];
  }) => void;
}

export interface ManualQuestionPayload {
  text: string;
  type: 'objetiva' | 'subjetiva';
  disciplines: string[];
  alternatives?: { content: string; correct: boolean }[];
}

export interface Question {
  id: string;
  text: string;
  questionType: 'OBJ' | 'SUB';
  alternatives?: { content: string; correct: boolean }[];
}

export interface ExistingQuestionsModalProps {
  visible: boolean;
  examId: FullExam['id'];
  onClose: () => void;
  onAdded: (questions: Question[]) => void;
  currentQuestionIds: string[];
}