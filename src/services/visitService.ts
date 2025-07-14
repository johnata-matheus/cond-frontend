import api from '@/api/axios'
import type { IVisit } from '@/interfaces/IVisit'
import type { ICreateVisit } from '@/interfaces/IVisit'

export const fetchAllVisits = async (status?: string) => {
  const { data } = await api.get('/visits', {
    params: { status },
  })
  return data.data
}

export const createVisit = async (visitData: ICreateVisit) => {
  const { data } = await api.post('/visits', visitData)
  return data
}

export const updateVisit = async (id: number, updateData: Partial<IVisit>) => {
  const { data } = await api.put(`/visits/${id}`, updateData)
  return data
}