import api from '@/lib/axios';

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao realizar login.');
  }
};

export const checkAuth = async () => {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) return null;
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
    const response = await api.post('/users', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao registrar usuário.');
  }
};
