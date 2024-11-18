import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;

const createSession = (sessionObj) => {
  return axios.post(`${baseUrl}/clock-in`, sessionObj, {
    headers: { token: localStorage.getItem('token') },
  });
};

const endSession = (sessionObj) => {
  return axios.post(`${baseUrl}/clock-out`, sessionObj, {
    headers: { token: localStorage.getItem('token') },
  });
};

const editSession = (sessionId, sessionObj) => {
  return axios.put(`${baseUrl}/session/${sessionId}`, sessionObj, {
    headers: { token: localStorage.getItem('token') },
  });
};

const getSessionsByStudentId = (studentId) => {
  return axios.get(`${baseUrl}/sessions/${studentId}`, {
    headers: { token: localStorage.getItem('token') },
  });
};

const deleteSessionById = (sessionId) => {
  return axios.delete(`${baseUrl}/sessions/${sessionId}`, {
    headers: { token: localStorage.getItem('token') },
  });
};

export default {
  createSession,
  editSession,
  endSession,
  getSessionsByStudentId,
  deleteSessionById,
};
