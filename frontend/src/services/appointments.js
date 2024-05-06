import axios from "axios";
// const baseUrl = "http://localhost:3001/api"; //develop URL

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const baseUrl = "/api"; //deployment URL
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Create an appointment
const createNewAppt = (appointmentObj) => {
  return axios
    .post(`${baseUrl}/newappointment`, appointmentObj, {
      headers: { token: localStorage.getItem("token") },
    })
    .then((response) => response)
    .catch((error) => {
      throw new Error(`Failed to create new appointment: ${error}`);
    });
};

//Get all appointments
const getAllAppointments = () => {
  return axios
    .get(`${baseUrl}/appointments`, {
      headers: { token: localStorage.getItem("token") },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Failed to fetch all appointments: ${error}`);
    });
};

//Edit appointment
const editAppointment = (editedAppointment) => {
  return axios
    .put(`${baseUrl}/editappointment`, editedAppointment, {
      headers: { token: localStorage.getItem("token") },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Failed to edit appointment: ${error}`);
    });
};

// Delete appointment
const deleteAppointment = (appointmentId) => {
  return axios
    .delete(`${baseUrl}/deleteappointment/${appointmentId}`, {
      headers: { token: localStorage.getItem("token") },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Failed to delete appointment: ${error}`);
    });
};

export default {
  createNewAppt,
  getAllAppointments,
  editAppointment,
  deleteAppointment,
};
