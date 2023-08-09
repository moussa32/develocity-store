import { useTranslation } from 'react-i18next'
import useCartStore from '@zustand/useCartStore'

const CartCard = ({ product }) => {
  const { t } = useTranslation()
  const { removeItem, items } = useCartStore((store) => store)
  const { id, price, name, images } = product

  console.log(id)

  return (
    <div className='flex gap-6'>
      <img
        src={images[0].src}
        className='bg-[#1E1E1E] w-2/4 lg:w-[244px] h-48 lg:h-[244px] object-contain rounded-tl-lg rounded-bl-lg'
        alt={name}
        title={name}
      />
      <div className='flex flex-col gap-y-3'>
        <h2 className='text-xl max-w-[165px]'>{name}</h2>
        <span className='text-[#D0D4DD] font-medium'>${price.toFixed(2)}</span>
        <div className='flex gap-5'>
          <button
            className='text-[#D0D4DD] capitalize underline underline-offset-2 font-medium'
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              console.log(name)
              removeItem(id)
            }}
          >
            {t('remove')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartCard
