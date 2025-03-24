import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true;

export const getQuestionBanks = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/question-banks`);
  return data;
};

export const createQuestionBank = async (payload: {
  name: string;
  description: string;
  questions: string[];
}) => {
  const { data } = await axios.post(`${API_BASE_URL}/question-banks`, payload);
  return data;
};

export const deleteQuestionBank = async (id: string) => {
  const { data } = await axios.delete(`${API_BASE_URL}/question-banks/${id}`);
  return data;
};

export const getQuestionBank = async (id: string) => {
  const { data } = await axios.get(`${API_BASE_URL}/question-banks/${id}`);
  return data;
};

export const updateQuestionBank = async (id: string, payload: { name: string; description: string }) => {
  const { data } = await axios.put(`${API_BASE_URL}/question-banks/${id}`, payload);
  return data;
};

export const addQuestionsToBank = async (bankId: string, questions: string[]) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/question-banks/${bankId}/add-questions`, { questions });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao adicionar questões ao banco.');
  }
};

export const removeQuestionsFromBank = async (bankId: string, questions: string[]) => {
  try {
    const { data } = await axios.patch(
      `${API_BASE_URL}/question-banks/${bankId}/remove-questions`,
      { questions }
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao remover questões do banco.');
  }
};
