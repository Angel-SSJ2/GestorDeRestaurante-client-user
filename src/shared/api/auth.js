import { axiosClient } from './api';

export const login = async (data) => {
  return await axiosClient.post('/auth/login', data);
};

export const register = async (data) => {
  return await axiosClient.post('/auth/register', data);
};

export const getMyProfile = async () => {
  return await axiosClient.get('/auth/me');
};

export const updateProfile = async (id, data) => {
  return await axiosClient.put(`/users/update/${id}`, data);
};
