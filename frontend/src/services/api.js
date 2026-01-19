import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials)
}

// Doctor APIs
export const doctorAPI = {
  getAll: () => api.get('/doctors'),
  getById: (id) => api.get(`/doctors/${id}`),
  getBySpecialization: (spec) => api.get(`/doctors/specialization/${spec}`),
  create: (doctorData) => api.post('/doctors', doctorData),
  update: (id, doctorData) => api.put(`/doctors/${id}`, doctorData),
  delete: (id) => api.delete(`/doctors/${id}`)
}

// Appointment APIs
export const appointmentAPI = {
  getAll: () => api.get('/appointments'),
  getById: (id) => api.get(`/appointments/${id}`),
  getByCustomer: (customerId) => api.get(`/appointments/customer/${customerId}`),
  getByDoctor: (doctorId) => api.get(`/appointments/doctor/${doctorId}`),
  getByStatus: (status) => api.get(`/appointments/status/${status}`),
  create: (appointmentData) => api.post('/appointments', appointmentData),
  updateStatus: (id, status) => api.put(`/appointments/${id}/status`, null, { params: { status } }),
  cancel: (id) => api.put(`/appointments/${id}/cancel`),
  delete: (id) => api.delete(`/appointments/${id}`)
}

export default api
