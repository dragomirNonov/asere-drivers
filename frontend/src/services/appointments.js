import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;

// Create an Axios instance
const apiClient = axios.create({
  baseURL: `${baseUrl}/appointments/`,
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

//Create an appointment
const createNewAppt = (appointmentObj) => apiClient.post('', appointmentObj);

//Get all appointments
const getAllAppointments = () => apiClient.get('');

//Get all real appointments
const getAllRealAppointments = () => apiClient.get('/real');

//Edit appointment
const editAppointment = (id, editedAppointment) =>
  apiClient.put(`/${id}`, editedAppointment);

// Delete appointment
const deleteAppointment = (appointmentId) =>
  apiClient.delete(`/${appointmentId}`);

export default {
  createNewAppt,
  getAllAppointments,
  editAppointment,
  deleteAppointment,
  getAllRealAppointments,
};
