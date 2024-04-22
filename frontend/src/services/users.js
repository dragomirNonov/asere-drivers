import axios from "axios";
const baseUrl = "http://localhost:3001/api/register";

const register = (rejisterObj) => {
  return axios.post(baseUrl, rejisterObj);
};

const login = (loginObj) => {
  return axios.post(`http://localhost:3001/api/login`, loginObj);
};

export default {
  register,
  login,
};
