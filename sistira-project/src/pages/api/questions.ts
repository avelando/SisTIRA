import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.withCredentials = true;

export const getQuestions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/questions`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || 'Erro ao listar questões.';
    throw new Error(message);
  }
};

export const createQuestion = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/questions`, data);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || 'Erro ao criar questão.';
    throw new Error(message);
  }
};

export const getQuestion = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/questions/${id}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || 'Erro ao buscar questão.';
    throw new Error(message);
  }
};

export const updateQuestion = async (id: string, data: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/questions/${id}`, data);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || 'Erro ao atualizar questão.';
    throw new Error(message);
  }
};

export const deleteQuestion = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/questions/${id}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || 'Erro ao deletar questão.';
    throw new Error(message);
  }
};
