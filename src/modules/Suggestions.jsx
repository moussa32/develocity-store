import { useTranslation } from 'react-i18next'
import ProductCard from '@components/ProductCard'

const Suggestions = ({ products, className }) => {
  const { t } = useTranslation('')

  return (
    <section className={`flex flex-col items-center md:items-baseline md:flex-row gap-x-8 gap-y-7 flex-wrap ${className}`}>
      <h2 className='text-6xl text-center capitalize flex-auto w-full'>{t('youMayAlsoLike')}</h2>
      {products &&
        products.length > 0 &&
        products.map((item) => <ProductCard className='max-w-[280px] w-full' key={`suggestion-${item.id}`} product={item} />)}
    </section>
  )
}

export default Suggestions
