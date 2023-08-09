import { useTranslation } from 'react-i18next'
import { Outlet, useLocation } from 'react-router-dom'
import Login from './Login'
import PageContent from '@components/layout/PageContent'
import sideImage from '@images/slider-thumbnail.png'

const AuthPage = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const pageType = pathname.includes('login') ? 'login' : pathname.includes('signup') ? 'signup' : null

  return (
    <PageContent>
      <>
        <h1 className='text-center mb-20 capitalize text-4xl lg:text-[62px]'>
          {pageType === 'signup' ? t('authPage.createAccount') : t('authPage.login')}
        </h1>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {!pageType ? <Login /> : <Outlet />}
          <div className='capitalize text-secondary text-base mt-10 md:mt-0'>
            <h2 className='text-2xl mb-6 text-white'>{t('authPage.joinOurStore')}</h2>
            <p>{t('authPage.benefitsDescription')}</p>
            <ul className='my-6'>
              <li>{t('authPage.benefits.0')}</li>
              <li>{t('authPage.benefits.1')}</li>
              <li>{t('authPage.benefits.2')}</li>
              <li>{t('authPage.benefits.3')}</li>
            </ul>
            <p>{t('authPage.joinReward')}</p>
            <p>{t('authPage.timeToUnlock')}</p>
            <img className='max-w-[488px] object-cover w-full mt-6 h-[200px]' src={sideImage} alt='' title='' />
          </div>
        </div>
      </>
    </PageContent>
  )
}

export default AuthPage
