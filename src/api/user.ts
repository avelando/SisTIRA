import api from '@/lib/axios';

export const getUserProfile = async () => {
  const res = await api.get('/users/me');
  return res.data;
};

export const deleteUserProfile = async () => {
  const res = await api.delete('/users/me');
  return res.data;
};

export const updateUserProfile = async (userData: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImageUrl: string | null;
}) => {
  const res = await api.patch('/users/me', userData);
  return res.data;
};

export const updateUserProfileImage = async (formData: FormData) => {
  const res = await api.patch('/users/me/profile-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
