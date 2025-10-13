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
