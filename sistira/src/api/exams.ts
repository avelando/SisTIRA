import api from '@/lib/axios';

import {
  ExamPayload,
  FullExam,
} from '@/interfaces/ExamsProps';

export const getExams = async (): Promise<FullExam[]> => {
  const { data } = await api.get('/exams');
  return data;
};

export const getExam = async (id: string): Promise<FullExam> => {
  const { data } = await api.get(`/exams/${id}`);
  return data;
};

export const createExam = async (payload: ExamPayload): Promise<FullExam> => {
  const { data } = await api.post('/exams', payload);
  return data;
};

export const updateExam = async (id: string, payload: ExamPayload): Promise<FullExam> => {
  try {
    const { data } = await api.put(`/exams/${id}`, payload);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar prova.');
  }
};

export const deleteExam = async (id: string): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete(`/exams/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao deletar prova.');
  }
};

export const addQuestionsToExam = async (examId: string, questions: string[]): Promise<FullExam> => {
  try {
    const { data } = await api.patch(`/exams/${examId}/add-questions`, { questions });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao adicionar questões à prova.');
  }
};

export const removeQuestionsFromExam = async (examId: string, questions: string[]): Promise<FullExam> => {
  try {
    const { data } = await api.patch(`/exams/${examId}/remove-questions`, { questions });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao remover questões da prova.');
  }
};

export const addBanksToExam = async (examId: string, bankIds: string[]): Promise<FullExam> => {
  try {
    const { data } = await api.patch(`/exams/${examId}/add-banks`, { bankIds });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao adicionar banco de questões à prova.');
  }
};

export const removeBanksFromExam = async (examId: string, bankIds: string[]): Promise<FullExam> => {
  try {
    const { data } = await api.patch(`/exams/${examId}/remove-banks`, { bankIds });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao remover banco de questões da prova.');
  }
};
