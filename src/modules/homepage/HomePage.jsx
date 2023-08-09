import Categories from '@modules/homepage/Categories'
import Features from '@modules/homepage/Features'
import Hero from '@modules/homepage/Hero'
import HotOffer from '@modules/homepage/HotOffer'
import PopularPicks from '@modules/homepage/PopularPicks'
import Slider from '@modules/homepage/Slider'

const HomePage = () => {
  return (
    <>
      <Hero />
      <Slider />
      <Categories />
      <PopularPicks />
      <HotOffer />
      <Features />
    </>
  )
}

export default HomePage
