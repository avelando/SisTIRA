import { CreateExamPayload, UpdateExamPayload } from '@/interfaces/ExamsProps';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true;

export const getExams = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/exams`);
  return data;
};

export const getExam = async (id: string) => {
  const { data } = await axios.get(`${API_BASE_URL}/exams/${id}`);
  return data;
};

export const createExam = async (payload: CreateExamPayload) => {
  const { data } = await axios.post(`${API_BASE_URL}/exams`, payload);
  return data;
};

export const updateExam = async (id: string, payload: UpdateExamPayload) => {
  try {
    const { data } = await axios.put(`${API_BASE_URL}/exams/${id}`, payload);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar prova.');
  }
};

export const deleteExam = async (id: string) => {
  try {
    const { data } = await axios.delete(`${API_BASE_URL}/exams/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao deletar prova.');
  }
};

export const addQuestionsToExam = async (examId: string, questions: string[]) => {
  try {
    const { data } = await axios.patch(`${API_BASE_URL}/exams/${examId}/add-questions`, { questions });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao adicionar questões à prova.');
  }
};

export const removeQuestionsFromExam = async (examId: string, questions: string[]) => {
  try {
    const { data } = await axios.patch(`${API_BASE_URL}/exams/${examId}/remove-questions`, { questions });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao remover questões da prova.');
  }
};

export const addBanksToExam = async (examId: string, bankIds: string[]) => {
  try {
    const { data } = await axios.patch(`${API_BASE_URL}/exams/${examId}/add-banks`, { bankIds });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao adicionar banco de questões à prova.');
  }
};

export const removeBanksFromExam = async (examId: string, bankIds: string[]) => {
  try {
    const { data } = await axios.patch(`${API_BASE_URL}/exams/${examId}/remove-banks`, { bankIds });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao remover banco de questões da prova.');
  }
};
