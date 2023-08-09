import axios from 'axios'
import { storeBaseURL } from './constants'

const submitContactUs = (message) => {
  return axios.post(`${storeBaseURL}/support`, {
    ...message
  })
}

export { submitContactUs }
