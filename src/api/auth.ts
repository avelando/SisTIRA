import api, { raw } from '@/lib/axios';
import { setTokens, clearTokens, getRefreshToken } from '@/lib/authStorage';

type LoginPayload = { email: string; password: string };

export const loginUser = async (data: LoginPayload) => {
  const res = await api.post('/auth/login', data);
  const { accessToken, refreshToken, user } = res.data;
  setTokens(accessToken, refreshToken);
  return user;
};

export const registerUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}) => {
  const res = await api.post('/auth/register', data);
  const { accessToken, refreshToken, user } = res.data;
  setTokens(accessToken, refreshToken);
  return user;
};

export const checkAuth = async () => {
  try {
    const res = await api.get('/users/me');
    return res.data;
  } catch {
    return null;
  }
};

export const refreshTokens = async () => {
  const rt = getRefreshToken();
  if (!rt) throw new Error('No refresh token');
  const res = await raw.post('/auth/refresh', { refreshToken: rt });
  const { accessToken, refreshToken } = res.data;
  setTokens(accessToken, refreshToken);
  return accessToken;
};

export const logout = async () => {
  const rt = getRefreshToken();
  try {
    if (rt) await raw.post('/auth/logout', { refreshToken: rt });
  } finally {
    clearTokens();
  }
};
