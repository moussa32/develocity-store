import { Link } from 'react-router-dom'
// import demoProductImage from '@images/item-thumbnail.png' [----- Waiting approve for collection API to remove it -----]
import { useTranslation } from 'react-i18next'

const ProductCard = ({ className, product, url }) => {
  const { t } = useTranslation()
  const { name, slug, price, stock_status, images } = product
  const productImage = images instanceof Array ? images[0] : product.image

  return (
    <Link to={url ? url : `/product/${slug}`} className={`hover:text-indigo-400 z-20 relative ${className}`}>
      <div className='h-[324px] bg-[#1E1E1E] relative group overflow-hidden rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-b hover:from-[#6366F1] hover:to-[#0BF0ED]'>
        {stock_status === 'outofstock' && (
          <span className='h-8 bg-indigo-500 relative opacity-100 transition-all duration-500 group-hover:opacity-0 z-20 text-white w-full flex items-center justify-center mb-3 uppercase'>
            {t('outOfStock')}
          </span>
        )}
        {productImage && (
          <img
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[245px] w-full object-cover max-w-[197px] block mx-auto'
            src={productImage?.src}
            alt={productImage?.alt}
            title={productImage?.name}
          />
        )}
      </div>
      <div className='mt-[10px] px-3'>
        <h3 className='capitalize text-[22px]'>{name}</h3>
        {price && <span className='block text-lg'>${Number(price).toFixed(2)}</span>}
      </div>
    </Link>
  )
}

export default ProductCard
