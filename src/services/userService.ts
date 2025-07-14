import api from '@/api/axios'

export const fetchCurrentUser = async () => {
  const { data } = await api.get('/user')
  return data.data
}