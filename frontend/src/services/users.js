import axios from "axios";
const baseUrl = "http://localhost:3001/api"; //develop URL

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const baseUrl = "/api"; // deployiment URL
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const register = (rejisterObj) => {
  return axios.post(`${baseUrl}/register`, rejisterObj);
};

const login = (loginObj) => {
  return axios.post(`${baseUrl}/login`, loginObj);
};

const getUserById = (userId) => {
  return axios.post(`${baseUrl}/user`, { id: userId });
};

const getAllStudents = () => {
  return axios.get(`${baseUrl}/students`, {
    headers: { token: localStorage.getItem("token") },
  });
};

const editStudent = (updatedData) => {
  return axios.put(`${baseUrl}/editstudent`, updatedData, {
    headers: { token: localStorage.getItem("token") },
  });
};

const deleteStudent = (studentId) => {
  return axios.delete(`${baseUrl}/deletestudent/${studentId}`, studentId, {
    headers: { token: localStorage.getItem("token") },
  });
};

const addStudent = (studentObj) => {
  return axios.post(`${baseUrl}/addstudent`, studentObj, {
    headers: { token: localStorage.getItem("token") },
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
