import api from '@/lib/axios';

export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao obter os dados do usuário.");
  }
};

export const deleteUserProfile = async () => {
  try {
    const response = await api.delete('/users/me');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao deletar a conta do usuário.");
  }
};

export const updateUserProfile = async (userData: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImageUrl: string | null;
}) => {
  try {
    const response = await api.patch('/users/me', userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao atualizar os dados do usuário.");
  }
};

export const updateUserProfileImage = async (formData: FormData) => {
  try {
    const response = await api.patch('/users/me/profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Erro ao atualizar imagem de perfil.'
    );
  }
};