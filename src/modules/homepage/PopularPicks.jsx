import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { fetchPopularProducts } from '@api/products'
import { fetchCollection } from '@api/products'
import ProductCard from '@components/ProductCard'
import useLanguageQuery from '@hooks/useLanguageQuery'
// import CollectionThumbnail from '@images/collection-thumbnail.png' [----- Waiting approve for collection API to remove it -----]

const PopularPicks = () => {
  const { t } = useTranslation()
  const { data: popularProducts } = useLanguageQuery({
    queryKey: ['getPopularProducts'],
    fetchFunction: fetchPopularProducts,
    queryOptions: { suspense: true }
  })
  const { data: collection } = useLanguageQuery({
    queryKey: ['getCollection'],
    fetchFunction: fetchCollection,
    queryOptions: { suspense: true }
  })

  return (
    <section className='container'>
      <div className='flex flex-wrap justify-between'>
        <h2 className='capitalize text-3xl md:text-[42px]'>{t('homePage.popularPicks')}</h2>
        <Link className='flex items-center gap-1 font-medium capitalize text-indigo-500' to={`/products`}>
          {t('allProducts')}
          <FiArrowRight className='rtl:rotate-180' size={17} />
        </Link>
        <div className='flex-auto w-full gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-y-16 mt-10'>
          {popularProducts.map((product, index) => index < 5 && <ProductCard key={index} product={product} />)}
          <div className='relative hidden xl:flex flex-col overflow-hidden ltr:bg-gradient-to-r rtl:bg-gradient-to-l xl:col-start-2 xl:col-end-5 from-[#4548B1] to-black h-[324px] rounded-xl py-7 px-10'>
            <span className='flex items-center justify-center rounded-[40px] border-1 border-white capitalize px-[14px] py-[5px] w-fit'>
              new collection
            </span>
            <h2 className='text-[34px] mt-[10px] max-w-[304px] z-10'>Free Worldwide Shipping Over $99.00</h2>
            <Link
              className='rounded-full z-20 cursor-pointer mt-auto flex items-center justify-center w-12 h-12 bg-black'
              to={`/product/${collection?.product?.slug}`}
            >
              <FiArrowRight className='rtl:rotate-180' size={25} />
            </Link>
            <img
              className='absolute ltr:-right-[11rem] rtl:-left-[11rem] -top-[13rem] w-[856px] h-[856px]'
              src={collection?.image}
              alt='collection name'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PopularPicks
