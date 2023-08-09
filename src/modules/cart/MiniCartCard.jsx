import { useTranslation } from 'react-i18next'

const MiniCartCard = ({ product, quantity }) => {
  const { t } = useTranslation('')
  const { name, price, images } = product

  return (
    <section className='flex'>
      <img className='w-[91px] h-20 object-contain' src={images[0].src} alt={name} title={name} />
      <div className='ml-3'>
        <h2 className='font-medium text-[#29233B] max-w-[149px]'>{name}</h2>
        <span className='capitalize text-[#4E4763] opacity-70'>
          {t('quantity')}: {quantity}
        </span>
      </div>
      <span className='ml-auto text-sm text-[#29233B] font-medium'>${price.toFixed(2)}</span>
    </section>
  )
}

export default MiniCartCard
