import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.withCredentials = true;

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/me`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Erro ao obter os dados do usuário.";
    throw new Error(message);
  }
};

export const deleteUserProfile = async () => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/me`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Erro ao deletar a conta do usuário.";
    throw new Error(message);
  }
};
