import Categories from '@modules/homePage/Categories'
import Features from '@modules/homePage/Features'
import Hero from '@modules/homePage/Hero'
import HotOffer from '@modules/homePage/HotOffer'
import PopularPicks from '@modules/homePage/PopularPicks'
import Slider from '@modules/homePage/Slider'

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
