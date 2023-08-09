import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'
import { Suspense, lazy } from 'react'
import { Helmet } from 'react-helmet'
import Layout from '@components/layout/Layout'
import PageLoader from '@components/PageLoader'
import ProtectedPage from '@components/ProtectedPage'
import 'react-toastify/dist/ReactToastify.css'

const HomePage = lazy(() => import('@modules/homepage/HomePage'))
const ProductsPage = lazy(() => import('@modules/products/ProductsPage'))
const ProductPage = lazy(() => import('@modules/product/ProductPage'))
const CartPage = lazy(() => import('@modules/cart/CartPage'))
const StaticPage = lazy(() => import('@modules/staticPages/StaticPage'))
const OrdersPage = lazy(() => import('@modules/dashboard/orders/OrdersPage'))
const OrderDetailsPage = lazy(() => import('@modules/dashboard/orderDetails/OrderDetailsPage'))
const NotificationsPage = lazy(() => import('@modules/dashboard/notifications/NotificationsPage'))
const Signup = lazy(() => import('@modules/auth/Signup'))
const ContactUsPage = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import('@modules/contactUs/ContactUsPage')), 800)
    })
)
const AuthPage = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import('@modules/auth/AuthPage')), 800)
    })
)
const Login = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import('@modules/auth/Login')), 800)
    })
)
const Settings = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import('@modules/dashboard/settings/Settings')), 800)
    })
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/contact-us', element: <ContactUsPage /> },
      { path: '/p/:pageSlug', element: <StaticPage /> },
      {
        path: '/product/:productSlug',
        element: <ProductPage />
      },
      {
        path: '/products',
        element: (
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <ProductsPage />
          </QueryParamProvider>
        ),
        children: [{ path: ':categorySlug', element: <ProductsPage /> }]
      },
      {
        path: '/auth',
        element: <AuthPage />,
        children: [
          { index: true, path: 'login', element: <Login /> },
          { path: 'signup', element: <Signup /> }
        ]
      },
      {
        path: '/dashboard',
        element: <ProtectedPage />,
        children: [
          { index: true, element: <OrdersPage /> },
          { path: 'orders', element: <OrdersPage /> },
          { path: 'settings/*', element: <Settings /> },
          { path: 'notifications', element: <NotificationsPage /> },
          { path: 'order/:orderId', element: <OrderDetailsPage /> }
        ]
      }
    ]
  }
])

const App = () => {
  const { i18n } = useTranslation()

  return (
    <main className='bg-black flex flex-col min-h-screen text-white overflow-hidden'>
      <Helmet htmlAttributes={{ lang: i18n.language, dir: i18n.dir() }} />

      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>

      <ToastContainer pauseOnFocusLoss pauseOnHover theme='dark' rtl={i18n.dir === 'rtl' ? true : false} />
    </main>
  )
}

export default App
