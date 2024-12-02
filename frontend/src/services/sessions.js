import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;

// Create an Axios instance
const apiClient = axios.create({
  baseURL: `${baseUrl}/sessions`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TOKEN
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['token'] = token;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ErrorHandler
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject({
      status: error.response.status,
      statusText: error.response.statusText,
      message:
        error.response.data.message ??
        'Something went wrong. Please try again.',
      errors: error.response?.data?.errors,
    });
  },
);

// API functions
const createSession = (sessionObj) => apiClient.post('', sessionObj);

const editSession = (sessionId, sessionObj) =>
  apiClient.put(`/${sessionId}`, sessionObj);

const getSessionsByStudentId = (studentId) => apiClient.get(`/${studentId}`);

const deleteSessionById = (sessionId) => apiClient.delete(`/${sessionId}`);

export default {
  createSession,
  editSession,
  getSessionsByStudentId,
  deleteSessionById,
};
