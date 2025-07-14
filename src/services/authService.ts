import api from '@/api/axios'

export interface RegisterPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
  role?: string
}

export async function register(payload: RegisterPayload) {
  const res = await api.post('/register', {
    ...payload,
    role: payload.role || 'morador'
  })
  if (!res.data?.token) throw new Error(res.data?.message || 'Erro ao registrar')
  localStorage.setItem('token', res.data.token)
  return res.data
}

export interface LoginPayload {
  email: string
  password: string
}

export async function login(payload: LoginPayload) {
  const res = await api.post('/login', payload)
  if (!res.data?.token) throw new Error(res.data?.message || 'Erro ao logar')
  localStorage.setItem('token', res.data.token)
  return res.data
}