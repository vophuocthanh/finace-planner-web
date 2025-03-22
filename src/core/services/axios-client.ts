import config from '@/configs'
import { getAccessTokenFromLS, removeAccessTokenFromLS } from '@/core/shared/storage'
import axios, { HttpStatusCode } from 'axios'
import { isEqual } from 'lodash'

const controllers = new Map<string, AbortController>()

const axiosClient = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use(
  (config) => {
    if (config.url) {
      const prevController = controllers.get(config.url)
      if (prevController) {
        prevController.abort()
      }
    }

    const controller = new AbortController()
    config.signal = controller.signal

    if (config.url) {
      controllers.set(config.url, controller)
    }

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
    if (response.config.url) {
      controllers.delete(response.config.url)
    }
    return response.data
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response && isEqual(error.response.status, HttpStatusCode.Unauthorized) && !originalRequest._retry) {
      originalRequest._retry = true
    } else if (error.response && isEqual(error.response.status, HttpStatusCode.Unauthorized)) {
      removeAccessTokenFromLS()
    }

    if (originalRequest?.url) {
      controllers.delete(originalRequest.url)
    }

    return Promise.reject(error)
  }
)

export default axiosClient
