import axios from 'axios'
import { storeBaseURL } from './constants'

const fetchNotifications = (userID) => axios.get(`${storeBaseURL}/notifications/${userID}`).then((data) => data.data)
const fetchUnreadNotificationsCount = (userID) =>
  axios.get(`${storeBaseURL}/unread_notifications_count/${userID}`).then((data) => data.data)

export { fetchNotifications, fetchUnreadNotificationsCount }
