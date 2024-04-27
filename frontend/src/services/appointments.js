import axios from "axios";
const baseUrl = "http://localhost:3001/api/newappointment";

const createNewAppt = (appointmentObj) => {
  return axios.post(baseUrl, appointmentObj);
};

//GET all appointments
const getAll = () => {
  return axios.get("http://localhost:3001/api/appointments");
};

//Edit appointment
const editAppointment = (editedAppointment) => {
  return axios.put(
    "http://localhost:3001/api/editappointment",
    editedAppointment
  );
};

export default {
  createNewAppt,
  getAll,
  editAppointment,
};
