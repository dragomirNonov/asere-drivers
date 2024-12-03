import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;

// Create an Axios instance
const apiClient = axios.create({
  baseURL: `${baseUrl}/users/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request that needs it
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (
    token &&
    !config.url.includes('login') &&
    !config.url.includes('register')
  ) {
    config.headers.token = token;
  }
  return config;
});

// ErrorHandler
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject({
      status: error.response?.status,
      statusText: error.response?.statusText,
      message:
        error.response?.data?.message ??
        'Something went wrong. Please try again.',
      errors: error.response?.data?.errors,
    });
  },
);

// Services
const register = (rejisterObj) => apiClient.post(`register`, rejisterObj);
const login = (loginObj) => apiClient.post(`login`, loginObj);
const getUserById = (userId) => apiClient.get(`${userId}`);
const getAllStudents = () => apiClient.get(``);
const editStudent = (updatedData, userId) =>
  apiClient.put(`${userId}`, updatedData);
const deleteStudent = (studentId) => apiClient.delete(`${studentId}`);
const addStudent = (studentObj) => apiClient.post('', studentObj);

export default {
  register,
  login,
  getUserById,
  getAllStudents,
  editStudent,
  deleteStudent,
  addStudent,
};
