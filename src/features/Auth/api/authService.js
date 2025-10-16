import api from '@/lib/axiosClient';

export const login = async (credentials) => {
  try {
    const response = await api.post('users/login', credentials);

    const accessToken = response.data.accessToken;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const signup = async (credentials) => {
  try {
    const response = await api.post('/users/signup', credentials);

    const accessToken = response.data.accessToken;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const logout = async () => {
  localStorage.removeItem('accessToken');
  try {
    await api.post('/users/logout');
  } catch (err) {
    console.error(err);
  }
};
