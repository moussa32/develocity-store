import { Outlet } from 'react-router-dom'
import Footer from '@components/layout/Footer'
import Navbar from '@components/layout/Navbar'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
