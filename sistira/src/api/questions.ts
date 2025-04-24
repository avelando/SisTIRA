import api from '@/lib/axios';

export const getQuestions = async () => {
  try {
    const response = await api.get('/questions');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao listar questões.');
  }
};

export const createQuestion = async (data: any) => {
  try {
    const response = await api.post('/questions', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao criar questão.');
  }
};

export const getQuestion = async (id: string) => {
  try {
    const response = await api.get(`/questions/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar questão.');
  }
};

export const updateQuestion = async (id: string, data: any) => {
  try {
    const response = await api.put(`/questions/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar questão.');
  }
};

export const deleteQuestion = async (id: string) => {
  try {
    const response = await api.delete(`/questions/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao deletar questão.');
  }
};
