export type ModelAnswerType = 'WRONG' | 'MEDIAN' | 'CORRECT';

export type Visibility = 'PUBLIC' | 'PRIVATE';
export type ResultsVisibility = 'IMMEDIATE' | 'WHEN_TEACHER_RELEASES' | 'AT_DATE';

export type BackendQuestionType =
  | 'SUBJECTIVE'
  | 'MULTIPLE_CHOICE_SINGLE'
  | 'MULTIPLE_CHOICE_MULTI'
  | 'TRUE_FALSE';

export type ResponseQuestionType = 'OBJ' | 'SUB';

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
  questionType: BackendQuestionType;
  alternatives?: ExamQuestionAlternative[];
}

export interface ExamSettings {
  accessCode?: string | null;
  visibility: Visibility;
  startsAt?: string | null;
  endsAt?: string | null;
  timeLimitInMinutes?: number | null;
  allowResponseEdit?: boolean;
  resultsVisibility?: ResultsVisibility;
  resultsReleaseAt?: string | null;
}

export interface FullExam {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  creatorId: string;
  settings?: ExamSettings;
  examQuestionBanks: {
    questionBank: ExamBank;
  }[];
  allQuestions: ExamQuestion[];
  questionCount: number;
}

export interface QuestionForResponse {
  id: string;
  text: string;
  questionType: BackendQuestionType;
  alternatives?: { id: string; content: string }[];
  modelAnswers?: { type: ModelAnswerType; content: string }[];
}

export interface ExamForResponse {
  examId: string;
  title: string;
  accessCode?: string;
  description?: string;
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
    text: string;
    questionType: ResponseQuestionType;
  };
  alternative?: {
    content: string;
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
  answers: ExamAnswerResult[];
}

export interface ExamResponseListItem {
  id: string;
  examId: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
  answers: Array<{
    id: string;
    question: { id: string; text: string; questionType: BackendQuestionType };
    alternative?: { id: string; content: string; correct: boolean };
    subjectiveText?: string;
    score?: number;
    feedback?: string;
  }>;
}

export interface ExamInfoProps {
  title: string;
  description: string;
  onTitleChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
}
