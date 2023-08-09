import PageContent from '@components/layout/PageContent'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { getUserOrders } from '@api/users'
import { getUserFromCookie } from '@util/auth'
import ProductCard from '@components/ProductCard'
import { FiArrowRight } from 'react-icons/fi'
import CollectionThumbnail from '@images/collection-thumbnail.png'

import DEMO_PRODUCTS from '../../../../public/assets/MOCK_PRODUCT.json'
import { Link } from 'react-router-dom'

const OrdersPage = () => {
  const { t } = useTranslation()
  const { data: userOrders } = useQuery({
    queryKey: ['getUserOrders'],
    queryFn: () => getUserOrders(getUserFromCookie?.ID),
    suspense: true,
    useErrorBoundary: true
  })

  const OrderItem = ({ orderDetails }) => {
    console.log(orderDetails)
    return (
      <>
        {orderDetails.line_items?.map((item) => (
          <div className='flex flex-col items-start' key={item.id}>
            <ProductCard className='w-full' url={`/dashboard/order/1`} product={item} />
            <button className='text-[#0BF0ED] capitalize px-3 underline-offset-4 underline mt-auto'>{t('dashboard.orderDetails')}</button>
          </div>
        ))}
      </>
    )
  }

  return (
    <PageContent>
      <h1 className='capitalize text-white text-center text-4xl lg:text-[64px]'>{t('dashboard.yourOrders')}</h1>
      <section className='mt-12'>
        <span className='text-2xl capitalize'>{t('dashboard.allOrders')}</span>
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mt-8'>
          {userOrders.map((order, index) => (
            <OrderItem key={index} orderDetails={order} />
          ))}
        </section>

        <section className='mt-14 mb-16'>
          <div className='relative hidden xl:flex flex-col overflow-hidden bg-gradient-to-r xl:col-start-2 xl:col-end-5 from-[#4548B1] to-black h-[436px] rounded-xl py-7 px-10'>
            <span className='flex items-center justify-center rounded-[40px] border-1 border-white capitalize px-[14px] py-[5px] w-fit'>
              new collection
            </span>
            <h2 className='text-[34px] mt-[10px] max-w-[402px]'>
              Free Worldwide
              <span className='block'>
                Shipping Over $99.<sup>00</sup>
              </span>
            </h2>

            <Link
              className='rounded-full z-20 cursor-pointer mt-auto flex items-center justify-center w-12 h-12 bg-black'
              to={`/collections/new-collection`}
            >
              <FiArrowRight className='' size={25} />
            </Link>
            <img className='absolute -right-[18rem] -top-[16rem] w-[1151px] h-[1151px]' src={CollectionThumbnail} alt='collection name' />
          </div>
        </section>
      </section>
    </PageContent>
  )
}

export default OrdersPage
