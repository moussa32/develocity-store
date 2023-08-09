import axios from 'axios'
import { storeBaseURL } from './constants'

const fetchCategories = (lang) => axios.get(`${storeBaseURL}/products/categories`, { params: { lang } }).then((data) => data.data)
const fetchFeatureCategories = (lang) =>
  axios.get(`${storeBaseURL}/products/categories`, { params: { lang } }).then((data) => {
    return data.data.filter((category) => category.is_featured)
  })

export { fetchCategories, fetchFeatureCategories }
