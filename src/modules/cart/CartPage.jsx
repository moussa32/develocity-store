import PageContent from '@components/layout/PageContent'
import { useTranslation } from 'react-i18next'
import Suggestions from '@modules/Suggestions'
import CartCard from '@modules/cart/CartCard'
import DemoImage from '@images/mini-cart-product-image.png'
import OrderSummary from '@modules/cart/OrderSummery'
import useCartStore from '@zustand/useCartStore'
import { Link } from 'react-router-dom'

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Long Sleeve Jersey with DEVE Logo',
    price: 49,
    slug: 'long-sleeve-jersey',
    images: [{ src: DemoImage, alt: '' }]
  },
  {
    id: 2,
    name: 'Cup DEVE Logo',
    price: 50,
    slug: 'cup-deve-logo',
    images: [{ src: DemoImage, alt: '' }]
  },
  {
    id: 3,
    name: 'Cup DEVE Logo',
    price: 50,
    slug: '',
    images: [{ src: DemoImage, alt: '' }]
  }
]

const CartPage = () => {
  const { t } = useTranslation('')
  const cartItems = useCartStore((state) => state.items)

  return (
    <PageContent>
      <h2 className='text-6xl capitalize text-center'>{t('cart.yourCart')}</h2>
      <section className='grid grid-cols-1 lg:grid-cols-3 mb-24 mt-[53px]'>
        <div className='col-span-2'>
          <h3 className='text-2xl mb-3'>{t('cart.totalItems', { totalItems: cartItems.length })}</h3>
          <section className='grid grid-cols-1 gap-y-6'>
            {cartItems.map((product) => (
              <Link key={`${product.name}${product.id}`} to={`/product/${product.slug}`}>
                <CartCard product={product} />
              </Link>
            ))}
          </section>
        </div>
        <div className='col-span-1'>
          <OrderSummary />
        </div>
      </section>
      <Suggestions className='mb-24 relative z-20' products={MOCK_PRODUCTS} />
    </PageContent>
  )
}

export default CartPage
