import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.withCredentials = true;

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Erro ao realizar login.";
    throw new Error(message);
  }
};

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/me`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return null;
    }
    throw new Error(`Erro ao verificar auth: ${error.response?.status}`);
  }
};

export const registerUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Erro ao registrar usuário.";
    throw new Error(message);
  }
};
