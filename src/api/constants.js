import axios from 'axios'
import i18next from 'i18next'
import { toast } from 'react-toastify'

export const baseURL = 'https://matgar.develocity.app'
export const storeBaseURL = `${baseURL}/wp-json/wc/v3`

axios.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    consumer_key: import.meta.env.VITE_CONSUMER_KEY,
    consumer_secret: import.meta.env.VITE_CONSUMER_SECRET,
    lang: i18next.language
  }
  return config
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      toast(error.message, { type: 'error', toastId: 'Network error' })
    }
    return Promise.reject(error)
  }
)
