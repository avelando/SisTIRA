export interface QuestionBankDiscipline {
  discipline: { name: string };
  isPredominant: boolean;
}

export interface BankProps {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  questions?: { questionId: string; question: { text: string } }[];
  questionBankDisciplines?: QuestionBankDiscipline[];
}

export interface ViewQuestionBankModalProps {
  visible: boolean;
  bank: BankProps;
  onClose: () => void;
}

export interface EditQuestionBankModalProps {
  visible: boolean;
  bank: BankProps;
  onClose: () => void;
  onUpdated: () => void;
}
