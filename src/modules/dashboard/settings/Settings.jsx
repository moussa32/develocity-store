import { NavLink, Outlet, Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { PiUserCircleLight } from 'react-icons/pi'
import { ReactComponent as AvatarIcon } from '@images/user-avatar-large.svg'
import PageContent from '@components/layout/PageContent'
import PageLoader from '@components/PageLoader'

const EditProfile = lazy(() => import('@modules/dashboard/settings/EditProfile'))

const Settings = () => {
  const { t } = useTranslation()

  return (
    <PageContent className='flex gap-8 mb-[131px]'>
      <section className='bg-white/20 flex flex-col p-6 rounded-lg w-1/4 min-h-[800px]'>
        <div className='flex items-center justify-center flex-col mb-6'>
          <AvatarIcon className='w-[160px]' />

          <h3 className='text-xl mt-3'>Hello, {`{username}`}</h3>
        </div>

        <nav className='flex flex-col gap-6 w-full h-full my-6'>
          <NavLink
            to='profile'
            className={({ isActive }) =>
              `capitalize border-y-1 py-4 flex items-center gap-2 text-xl hover:text-indigo-500 hover:border-indigo-500 ${
                isActive ? 'text-indigo-500 border-indigo-500' : ''
              }`
            }
          >
            <PiUserCircleLight className='text-3xl' />
            {t('dashboard.editProfile')}
          </NavLink>
        </nav>
        <Button className='bg-white h-16 mt-auto flex-shrink-0'>Logout</Button>
      </section>
      <section className='w-3/4'>
        <Routes>
          <Route index element={<EditProfile />} />
          <Route path='profile' element={<EditProfile />} />
        </Routes>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </section>
    </PageContent>
  )
}

export default Settings
