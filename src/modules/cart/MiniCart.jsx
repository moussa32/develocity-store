import { ReactComponent as CartIcon } from '@images/cart-icon.svg'
import { Popover, Empty } from 'antd'
import { IoClose } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useCartStore from '@zustand/useCartStore'
import MiniCartCard from './MiniCartCard'
import useViewportSize from '@hooks/useViewportSize'

const MiniCart = ({ cartIconClassName }) => {
  const [open, setOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const cartItems = useCartStore((state) => state.items)
  const location = useLocation()
  const isMobileScreen = useViewportSize(768)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const hide = () => {
    setOpen(false)
  }

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen)
  }

  const cartTotalCost = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.product.quantity, 0)
  }, [cartItems])

  return (
    <div className='relative'>
      <div className='relative miniCart cursor-pointer rounded-xl z-10 ' onClick={() => handleOpenChange(!open)}>
        <CartIcon className={cartIconClassName} />
        <span className='absolute top-[3px] !font-sans -right-[5px] rounded-full text-xs flex items-center justify-center bg-white w-4 h-4 font-bold text-indigo-500'>
          {cartItems.length}
        </span>
      </div>
      {open && (
        <>
          <Popover
            trigger='click'
            open={open}
            className='absolute right-0 top-0 w-full h-full'
            placement={isMobileScreen ? 'bottom' : i18n.dir() === 'rtl' ? 'bottomLeft' : 'bottomRight'}
            align={!isMobileScreen && { targetOffset: i18n.dir() === 'rtl' ? ['50%', '-40%'] : ['-50%', '-40%'] }}
            overlayClassName={`miniCart md:max-w-[458px] ${
              isMobileScreen &&
              '[&_.ant-popover-content]:absolute [&_.ant-popover-content]:left-1/2 [&_.ant-popover-content]:transform [&_.ant-popover-content]:-translate-x-1/2 md:[&_.ant-popover-content]:transform-none'
            } relative`}
            content={
              <div className='p-6 w-[calc(100vw_-_15px)] md:max-w-[458px]'>
                <div className='flex justify-between'>
                  <h2 className='mb-7 text-lg text-[#29233B] capitalize font-medium'>{t('cart.itemAdded')}</h2>
                  <IoClose onClick={hide} size={20} className={`cursor-pointer`} />
                </div>
                <div className='grid grid-cols-1 gap-3 pr-4 justify-center max-h-[360px] overflow-y-auto customScrollBar'>
                  {cartItems.length > 0 ? (
                    cartItems.map((product) => <MiniCartCard key={product.id} quantity={product.product.quantity} product={product} />)
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
                </div>

                <div className='flex mb-[30px] border-t-1 mt-6 pt-3'>
                  <div>
                    <h2 className='font-medium text-lg text-[#29233B]'>{t('cart.cartSubTotal', { itemsCount: cartItems.length })}:</h2>
                    <span className='text-[#4E4763]'>{t('cart.excludesSalesTax')}</span>
                  </div>
                  <span className='ltr:ml-auto rtl:mr-auto font-medium text-lg text-[#29233B]'>${cartTotalCost}</span>
                </div>
                <div className='flex gap-3 md:flex-nowrap'>
                  <Link to='/cart' className='flex items-center justify-center bg-black rounded w-1/2 h-12 text-white text-sm capitalize'>
                    {t('cart.viewCart')}
                  </Link>
                  <button className='bg-indigo-500 rounded w-1/2 h-12 text-white text-sm capitalize'>{t('checkout')}</button>
                </div>
              </div>
            }
          />
        </>
      )}
    </div>
  )
}

export default MiniCart
