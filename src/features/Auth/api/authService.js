import api from '@/lib/axiosClient';

export const login = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);

    const accessToken = response.accessToken;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const signup = async (credentials) => {
  try {
    const response = await api.post('/users/signup', credentials);

    const accessToken = response.accessToken;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const logout = async () => {
  localStorage.removeItem('accessToken');
  try {
    await api.post('/users/logout');
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
