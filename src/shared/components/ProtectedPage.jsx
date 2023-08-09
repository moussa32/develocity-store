import { isUserLoggedIn } from '@util/auth'
import { Outlet } from 'react-router-dom'

const ProtectedPage = () => {
  if (!isUserLoggedIn()) {
    window.location.assign('/auth')
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default ProtectedPage
