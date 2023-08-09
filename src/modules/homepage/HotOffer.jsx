import HotOfferImage from '@images/get-ready.png'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { HiArrowLongRight } from 'react-icons/hi2'

const HotOffer = () => {
  const { t } = useTranslation('')

  return (
    <section className='container z-20'>
      <img src={HotOfferImage} alt='hot offer' title='hot offer' />
      <section className='bg-indigo-500 h-full pt-[78px] pb-[97px] lg:h-[324px] text-center'>
        <h2 className='capitalize text-[52px]'>BECOME A MEMBER & GET 20% OFF</h2>
        <Link
          type='button'
          className='mt-[18px] border border-white group gap-2 rounded w-[282px] h-[62px] flex items-center justify-center mx-auto transition-all duration-200 hover:bg-white'
          to='/auth/signup'
        >
          {t('homePage.createAnAccount')}
          <HiArrowLongRight
            className='transition text-xl duration-300 group-hover:scale-150 group-hover:translate-x-2
          '
          />
        </Link>
      </section>
    </section>
  )
}

export default HotOffer
