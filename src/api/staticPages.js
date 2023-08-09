import axios from 'axios'
import { storeBaseURL } from './constants'

const fetchPageBySlug = (pageSlug) =>
  axios
    .get(`${storeBaseURL}/pages`, {
      params: {
        slug: pageSlug
      }
    })
    .then((data) => data.data[0])

export { fetchPageBySlug }
