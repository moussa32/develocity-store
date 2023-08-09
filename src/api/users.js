import axios from 'axios'
import { storeBaseURL } from './constants'

const userLogin = (userLoginCredentials) => {
  return axios.post(`${storeBaseURL}/login/`, {
    email: userLoginCredentials.email,
    password: userLoginCredentials.password
  })
}

const userRegister = (userRegisterCredentials) =>
  axios.post(`${storeBaseURL}/register`, {
    first_name: userRegisterCredentials.first_name,
    last_name: userRegisterCredentials.last_name,
    username: userRegisterCredentials.username,
    email: userRegisterCredentials.email,
    gender: userRegisterCredentials.gender,
    user_pass: userRegisterCredentials.user_pass
  })

const getUserOrders = (customerId) =>
  axios
    .get(`${storeBaseURL}/orders`, {
      params: {
        customer: customerId
      }
    })
    .then((data) => data.data)

const createOrder = (items, customerId) =>
  axios.post(`${storeBaseURL}/orders`, {
    customer_id: customerId,
    payment_method: 'bacs',
    payment_method_title: 'Direct Bank Transfer',
    set_paid: true,
    billing: {
      first_name: 'John',
      last_name: 'Doe',
      address_1: '969 Market',
      address_2: '',
      city: 'San Francisco',
      state: 'CA',
      postcode: '94103',
      country: 'US',
      email: 'john.doe@example.com',
      phone: '(555) 555-5555'
    },
    shipping: {
      first_name: 'John',
      last_name: 'Doe',
      address_1: '969 Market',
      address_2: '',
      city: 'San Francisco',
      state: 'CA',
      postcode: '94103',
      country: 'US'
    },
    line_items: items,
    shipping_lines: [
      {
        method_id: 'flat_rate',
        method_title: 'Flat Rate',
        total: '10.00'
      }
    ]
  })

export { userLogin, userRegister, getUserOrders, createOrder }
