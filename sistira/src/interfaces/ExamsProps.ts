export interface ExamPayload {
  title: string;
  description?: string;
}

export interface ExamQuestionRelation {
  questionId: string;
  question: ExamQuestion;
}

export interface ExamBank {
  id: string;
  name: string;
}

export interface ExamUpdatePayload {
  title: string;
  description: string;
};

export interface ExamQuestionAlternative {
  id: string;
  content: string;
  correct: boolean;
}

export interface ExamQuestion {
  id: string;
  text: string;
  questionType: 'OBJ' | 'SUB';
  alternatives?: ExamQuestionAlternative[];
}

export interface FullExam {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  creatorId: string;

  examQuestionBanks: {
    questionBank: ExamBank;
  }[];

  allQuestions: ExamQuestion[];
}
