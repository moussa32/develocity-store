import { useTranslation } from 'react-i18next'
import { ReactComponent as Bitpay } from '@images/Bitpay.svg'
import { ReactComponent as Paypal } from '@images/Paypal.svg'
import { ReactComponent as Stripe } from '@images/Stripe.svg'
import { ReactComponent as Visa } from '@images/Visa.svg'
import { ReactComponent as Mastercard } from '@images/Mastercard.svg'
import { useMemo } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createOrder } from '@api/users'
import { getUserFromCookie } from '@util/auth'
import { Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { isUserLoggedIn } from '../../shared/util/auth'
import useCartStore from '@zustand/useCartStore'

const OrderSummary = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { items: cartItems, clearCart } = useCartStore((state) => state)

  const { mutate, isLoading } = useMutation({
    mutationKey: ['createOrder'],
    mutationFn: () =>
      createOrder(
        cartItems.map((item) => item.product),
        getUserFromCookie.ID
      ),
    onSuccess: () => {
      message.success(t('cart.yourOrderHasBeenSuccessfullyPlaced'))
      setTimeout(() => {
        clearCart()
        navigate('/dashboard/orders')
      }, 2500)
    }
  })

  const totalCost = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.product.quantity, 0)
  }, [cartItems])

  return (
    <section className='max-w-[384px] w-full'>
      <h3 className='text-2xl capitalize mb-3'>{t('orderSummery')}</h3>
      <section className='bg-indigo-500 mb-5 rounded-lg p-6 capitalize font-medium'>
        <div className='flex justify-between mb-3 text-sm'>
          <span>{t('shipping')}</span>
          <span>{t('free')}</span>
        </div>
        <div className='flex justify-between mb-6 text-sm'>
          <span>{t('salesTax')}</span>
          <span>{t('calculatedAtCheckout')}</span>
        </div>
        <div className='flex justify-between pt-6 border-t-1 border-white border-opacity-[0.28] text-lg'>
          <span>{t('subtotal')}</span>
          <span>${totalCost}</span>
        </div>
      </section>
      {isUserLoggedIn() ? (
        <Button
          loading={isLoading}
          onClick={mutate}
          className='bg-white rounded h-[52px] flex items-center justify-center text-black w-full capitalize'
        >
          {t('checkout')}
        </Button>
      ) : (
        <Link className='bg-white rounded h-[52px] flex items-center justify-center text-black w-full capitalize' to='/auth'>
          {t('cart.loginToCheckOut')}
        </Link>
      )}

      <div className='mx-auto justify-center mt-6 flex gap-x-2'>
        <h3 className='text-sm'>{t('weAccept')}:</h3>
        <Bitpay />
        <Paypal />
        <Stripe />
        <Visa />
        <Mastercard />
      </div>
    </section>
  )
}

export default OrderSummary
