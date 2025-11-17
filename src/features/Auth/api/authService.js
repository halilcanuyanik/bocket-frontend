import api from '@/lib/axiosClient';

export const login = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);

    const accessToken = response.data.accessToken;

    const role = response.data.data.role;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    if (role) {
      localStorage.setItem('role', role);
    }

    return response;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const signup = async (credentials) => {
  try {
    const response = await api.post('/users/signup', credentials);

    const accessToken = response.data.accessToken;

    const role = response.data.data.role;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    if (role) {
      localStorage.setItem('role', role);
    }

    return response;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const logout = async () => {
  const token = localStorage.getItem('accessToken');
  try {
    await api.post(
      '/users/logout',
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
