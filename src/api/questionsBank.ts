import api from '@/lib/axios';

export const getQuestionBanks = async () => {
  const { data } = await api.get('/question-banks');
  return data;
};

export const createQuestionBank = async (payload: {
  name: string;
  description: string;
  questions: string[];
}) => {
  const { data } = await api.post('/question-banks', payload);
  return data;
};

export const deleteQuestionBank = async (id: string) => {
  const { data } = await api.delete(`/question-banks/${id}`);
  return data;
};

export const getQuestionBank = async (id: string) => {
  const { data } = await api.get(`/question-banks/${id}`);
  return data;
};

export const updateQuestionBank = async (id: string, payload: { name: string; description: string }) => {
  const { data } = await api.patch(`/question-banks/${id}`, payload);
  return data;
};

export const addQuestionsToBank = async (bankId: string, questions: string[]) => {
  try {
    const response = await api.patch(`/question-banks/${bankId}/add-questions`, { questions });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao adicionar questões ao banco.');
  }
};

export const removeQuestionsFromBank = async (bankId: string, questions: string[]) => {
  try {
    const { data } = await api.patch(`/question-banks/${bankId}/remove-questions`, { questions });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao remover questões do banco.');
  }
};
