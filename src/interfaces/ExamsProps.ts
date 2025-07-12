export type ModelAnswerType = 'WRONG' | 'MEDIAN' | 'CORRECT';

export interface ExamPayload {
  title: string;
  description?: string;
  isPublic?: boolean;
  generateAccessCode?: boolean;
}

export interface ExamUpdatePayload {
  title: string;
  description: string;
}

export interface ExamBank {
  id: string;
  name: string;
}

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
  accessCode?: string;
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  creatorId: string;

  examQuestionBanks: {
    questionBank: ExamBank;
  }[];

  allQuestions: ExamQuestion[];

  questionCount: number;
}

export interface QuestionForResponse {
  id: string;
  text: string;
  questionType: 'OBJ' | 'SUB';
  alternatives?: { id: string; content: string }[];
  modelAnswers?: { type: ModelAnswerType; content: string }[];
}

export interface ExamForResponse {
  examId: string;
  title: string;
  accessCode?: string;
  description?: string;
  createdBy?: string;
  questions: QuestionForResponse[];
}

export interface SubmitResponseDto {
  examId: string;
  accessCode?: string;
  answers: Array<{
    questionId: string;
    alternativeId?: string;
    textResponse?: string;
  }>;
}

export interface ExamSummary {
  id: string;
  title: string;
  createdAt: string;
  questionsCount: number;
}

export interface SubmitResponseResult {
  id: string;
  examId: string;
  userId: string;
  createdAt: string;
}

export interface ExamAnswerResult {
  id: string;
  question: {
    id: string;
    text: string;
    questionType: 'OBJ' | 'SUB';
  };
  alternative?: {
    id: string;
    content: string;
    correct: boolean;
  };
  subjectiveText?: string;
  score?: number;
  feedback?: string;
}

export interface ExamResponseResult {
  id: string;
  examId: string;
  userId: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
  answers: ExamAnswerResult[];
}

export interface ExamInfoProps {
  title: string
  description: string
  onTitleChange: (v: string) => void
  onDescriptionChange: (v: string) => void
}
