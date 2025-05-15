import { FullExam } from "./ExamsProps";

export interface QuestionBankProps {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  questions?: {
    questionId: string;
    question: {
      text: string;
    };
  }[];
  questionBankDisciplines?: {
    discipline: {
      name: string;
    };
    isPredominant: boolean;
  }[];
}

export interface QuestionBankModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdated?: () => void;
  mode: 'create' | 'edit' | 'view';
  bank?: QuestionBankProps;
}

export interface QuestionSummary {
  id: string;
  text: string;
}

export interface ExistingBanksModalProps {
  visible: boolean;
  examId: string;
  currentBankIds: string[];
  currentQuestionIds: string[];
  onClose: () => void;
  onAdded: (updatedExam: FullExam) => void;
}
