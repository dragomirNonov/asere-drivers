import axios from "axios";
const baseUrl = "http://localhost:3001/api"; //develop URL

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const baseUrl = "/api"; // deployiment URL
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const createSession = (sessionObj) => {
  return axios.post(`${baseUrl}/clock-in`, sessionObj, {
    headers: { token: localStorage.getItem("token") },
  });
};

const endSession = (sessionObj) => {
  return axios.post(`${baseUrl}/clock-out`, sessionObj, {
    headers: { token: localStorage.getItem("token") },
  });
};

const getSessionsByStudentId = (studentId) => {
  return axios.get(`${baseUrl}/sessions/${studentId}`, {
    headers: { token: localStorage.getItem("token") },
  });
};

export default {
  createSession,
  endSession,
  getSessionsByStudentId,
};
