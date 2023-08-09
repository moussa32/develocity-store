import axios from 'axios'
import { storeBaseURL } from './constants'

const fetchMenu = (language) => axios.get(`${storeBaseURL}/menu`, { params: { lang: language } }).then((data) => data.data)
const fetchFooter = (language) => axios.get(`${storeBaseURL}/footer`, { params: { lang: language } }).then((data) => data.data)
const fetchSlider = (language) => axios.get(`${storeBaseURL}/sliders`, { params: { lang: language } }).then((data) => data.data)

export { fetchMenu, fetchSlider, fetchFooter }
