import config from '@/configs'
import { getAccessTokenFromLS, removeAccessTokenFromLS } from '@/core/shared/storage'
import axios, { HttpStatusCode } from 'axios'
import { isEqual } from 'lodash'

const axiosClient = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessTokenFromLS()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response && isEqual(error.response.status, HttpStatusCode.Unauthorized) && !originalRequest._retry) {
      originalRequest._retry = true
    } else if (error.response && isEqual(error.response.status, HttpStatusCode.Unauthorized)) {
      removeAccessTokenFromLS()
    }
    return Promise.reject(error)
  }
)

export default axiosClient
