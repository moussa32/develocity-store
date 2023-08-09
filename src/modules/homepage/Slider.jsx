import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import { ReactComponent as OpacityStroke } from '@images/opacity-stroke.svg'
import { ReactComponent as ColorfulStroke } from '@images/colorful-stroke.svg'
import { ReactComponent as OpacityLogo } from '@images/opacity-logo.svg'
import { ReactComponent as ColorfulLogo } from '@images/colorful-logo.svg'

// Import Swiper styles
import 'swiper/css'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

const Slider = () => {
  const { i18n } = useTranslation()
  const [swiper, setSwiper] = useState(null)

  useEffect(() => {
    if (swiper && !swiper.destroyed) {
      // Determine the current active slide index
      const activeSlideIndex = swiper.activeIndex

      // Update direction and RTL settings
      swiper.changeLanguageDirection(i18n.dir())
      swiper.rtlTranslate = i18n.dir() === 'rtl'

      // Update the swiper instance and reset the slide position
      swiper.update()
      swiper.slideTo(activeSlideIndex, 0)
    }
  }, [swiper, i18n])

  return (
    <section className='border-b-1 border-white border-opacity-30 py-6'>
      <Swiper
        dir={i18n.dir()}
        onSwiper={(swiper) => setSwiper(swiper)}
        loop
        slidesPerView={'auto'}
        modules={[Autoplay]}
        autoplay
        speed={1000}
      >
        {[...Array(15)].map((item, index) => (
          <SwiperSlide key={index} className='flex max-w-xs mx-12 items-center justify-center'>
            <div className='flex items-center gap-12'>
              {index % 2 === 0 ? (
                <>
                  <ColorfulStroke />
                  <ColorfulLogo className='w-60 h-12' />
                </>
              ) : (
                <>
                  <OpacityStroke />
                  <OpacityLogo />
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Slider
