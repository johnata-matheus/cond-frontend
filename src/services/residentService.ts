import api from '@/api/axios'

export interface ResidentPayload {
  apartment: string
  block?: string | null
  phone?: string | null
  active?: boolean
}

export async function createResident(payload: ResidentPayload) {
  const res = await api.post('/residents', payload)
  if (res.status !== 201) throw new Error(res.data?.message || 'Erro ao cadastrar morador')
  return res.data
}