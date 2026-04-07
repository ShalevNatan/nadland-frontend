import axios from 'axios'
import { fetchAuthSession } from 'aws-amplify/auth'

const api = axios.create({
  baseURL: 'https://vdvglnwc9k.execute-api.us-east-1.amazonaws.com/prod',
})

api.interceptors.request.use(async (config) => {
  const session = await fetchAuthSession()
  const token = session.tokens?.accessToken?.toString()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
