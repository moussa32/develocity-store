import Logo from '@images/Deve-Logo.png'
import { useTranslation } from 'react-i18next'

const PageLoader = () => {
  const { t } = useTranslation('')

  return (
    <div className='logo-container'>
      <img src={Logo} alt='Logo' className='colorful-logo' />
      <h1>{t('Deve Store')}</h1>
    </div>
  )
}

export default PageLoader
