export interface CreateExamPayload {
  title: string;
  description?: string;
  date?: string;
  questionBankId?: string;
}

export interface UpdateExamPayload {
  title?: string;
  description?: string;
  questions?: string[];
  questionBankId?: string;
}
