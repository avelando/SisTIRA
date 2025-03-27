export interface CreateExamPayload {
  title: string;
  description?: string;
}

export interface UpdateExamPayload {
  title?: string;
  description?: string;
}

interface Alternative {
  id: string;
  content: string;
}

interface Question {
  id: string;
  text: string;
  questionType: 'OBJ' | 'SUB';
  alternatives?: Alternative[];
}

export interface ExamData {
  id: string;
  title: string;
  description?: string;
  creatorId: string;
  allQuestions: Question[];
}
