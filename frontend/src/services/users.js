import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;

// Create an Axios instance
const apiClient = axios.create({
  baseURL: `${baseUrl}/users/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ErrorHandler
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject({
      status: error.response.status,
      statusText: error.response.statusText,
      message:
        error.response.data.message ??
        'Something went wrong. Please try again.',
    });
  },
);

const register = (rejisterObj) => apiClient.post(`register`, rejisterObj);

const login = (loginObj) => apiClient.post(`login`, loginObj);

const getUserById = (userId) => apiClient.get(`${userId}`);

const getAllStudents = () => {
  return apiClient.get(``, {
    headers: { token: localStorage.getItem('token') },
  });
};

const editStudent = (updatedData) => {
  return apiClient.put('', updatedData, {
    headers: { token: localStorage.getItem('token') },
  });
};

const deleteStudent = (studentId) => {
  return apiClient.delete(`${studentId}`, {
    headers: { token: localStorage.getItem('token') },
  });
};

const addStudent = (studentObj) => {
  return apiClient.post('', studentObj, {
    headers: { token: localStorage.getItem('token') },
  });
};

export default {
  register,
  login,
  getUserById,
  getAllStudents,
  editStudent,
  deleteStudent,
  addStudent,
};
