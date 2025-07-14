import axios from 'axios'

const api = axios.create({
  baseURL: 'cond-management-production-4525.up.railway.app/api',
  withCredentials: true,
})

// Adiciona o token Bearer em todas as requisições se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api