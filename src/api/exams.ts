import api from '@/lib/axios';
import {
  ExamPayload,
  FullExam,
  ExamForResponse,
  SubmitResponseDto
} from '@/interfaces/ExamsProps';
import { CountsResponse } from '@/interfaces/CountsResponse';

export const getExams = async (): Promise<FullExam[]> => {
  const { data } = await api.get('/exams');
  return data;
};

export const getExam = async (id: string): Promise<FullExam> => {
  const { data } = await api.get<FullExam>(`/exams/${id}`);
  return data;
};

export const createExam = async (payload: ExamPayload): Promise<FullExam> => {
  const { data } = await api.post('/exams', payload);
  return data;
};

export const updateExam = async (id: string, payload: ExamPayload): Promise<FullExam> => {
  const { data } = await api.put(`/exams/${id}`, payload);
  return data;
};

export const deleteExam = async (id: string): Promise<{ message: string }> => {
  const { data } = await api.delete(`/exams/${id}`);
  return data;
};

export const addQuestionsToExam = async (examId: string, questions: string[]): Promise<FullExam> => {
  const { data } = await api.patch(`/exams/${examId}/add-questions`, { questions });
  return data;
};

export const removeQuestionsFromExam = async (examId: string, questions: string[]): Promise<FullExam> => {
  const { data } = await api.delete(`/exams/${examId}/remove-questions`, { data: { questions } });
  return data;
};

export const addBanksToExam = async (examId: string, bankIds: string[]): Promise<FullExam> => {
  const { data } = await api.patch(`/exams/${examId}/add-banks`, { bankIds });
  return data;
};

export const removeBanksFromExam = async (examId: string, bankIds: string[]): Promise<FullExam> => {
  const { data } = await api.patch(`/exams/${examId}/remove-banks`, { bankIds });
  return data;
};

export const getUserCounts = async (): Promise<CountsResponse> => {
  const { data } = await api.get<CountsResponse>('/exams/counts');
  return data;
};

export const getExamForResponse = async (
  examId: string
): Promise<ExamForResponse> => {
  const { data } = await api.get(`/exams/respond/${examId}`, { withCredentials: true })
  return data
}

export const submitExamResponse = async (
  payload: SubmitResponseDto
): Promise<void> => {
  await api.post('/exams/respond', payload, { withCredentials: true })
}

export const checkExamAccess = async (
  examId: string
): Promise<{ hasAccess: boolean }> => {
  const { data } = await api.get(`/exams/${examId}/check-access`, { withCredentials: true });
  return data;
};

export const grantExamAccess = async (
  examId: string,
  accessCode: string
): Promise<ExamForResponse> => {
  const { data } = await api.post(
    `/exams/${examId}/grant-access`,
    { accessCode },
    { withCredentials: true }
  )
  return data
}

export const getExamForResponseAuth = async (
  examId: string
): Promise<ExamForResponse> => {
  const { data } = await api.get(
    `/exams/${examId}/respond-auth`,
    { withCredentials: true }
  );
  return data;
}
