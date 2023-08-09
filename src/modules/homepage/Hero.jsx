import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { fetchSlider } from '@api/global'
import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import useLanguageQuery from '@hooks/useLanguageQuery'

const Hero = () => {
  const { t, i18n } = useTranslation()
  const [swiper, setSwiper] = useState(null)

  useEffect(() => {
    if (swiper && !swiper.destroyed) {
      swiper.changeLanguageDirection(i18n.dir())
      swiper.rtlTranslate = i18n.dir() === 'rtl'
    }
  }, [swiper, i18n])

  const { data: sliders } = useLanguageQuery({
    queryKey: ['getSliders'],
    fetchFunction: fetchSlider,
    queryOptions: {
      suspense: true,
      useErrorBoundary: true
    }
  })

  return (
    <section className='h-[600px] lg:h-[810px] homePage-hero overflow-hidden'>
      <section className='container h-full pt-[122px] pb-10'>
        <Swiper
          dir={i18n.dir()}
          onSwiper={(swiper) => setSwiper(swiper)}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={i18n.dir() === 'rtl' ? 0 : 50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className='homePage-slider h-full'
          wrapperClass='items-stretch'
        >
          {sliders.map((slide) => (
            <SwiperSlide key={slide?.id} className='relative z-0 overflow-hidden !w-full'>
              <div className='flex relative h-full'>
                <img src={slide?.image} className='h-full w-full object-cover rounded-xl absolute z-20' />
                <Link
                  to={slide?.link}
                  className='flex items-center justify-center background rounded-sm mt-auto mb-14 md:mb-24 z-20 relative h-9 sm:h-[50px] lg:h-[62px] w-2/4 lg:w-[244px] mx-auto backdrop-blur-md bg-white/20'
                >
                  {t('homePage.getThemNow')}
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </section>
  )
}

export default Hero
