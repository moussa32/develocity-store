import { useTranslation } from 'react-i18next'
import PageContent from '@components/layout/PageContent'
import ProductImage from '@images/item-thumbnail.png'
import { useMemo } from 'react'
import { ReactComponent as TruckIcon } from '@images/truck-icon.svg'
import { PiPackage } from 'react-icons/pi'
import { LiaShippingFastSolid } from 'react-icons/lia'
import ShippingStepper from './ShippingStepper'

const OrderDetailsPage = () => {
  const { t } = useTranslation()

  const items = useMemo(
    () => [
      {
        title: t('dashboard.orderSteps.pickUpLocation'),
        status: 'finish',
        icon: <TruckIcon />
      },
      {
        title: t('dashboard.orderSteps.packageReceived'),
        status: 'finish',
        icon: <PiPackage />
      },
      {
        title: t('dashboard.orderSteps.dropOffLocation'),
        status: 'finish',
        icon: <LiaShippingFastSolid />
      },
      {
        title: t('dashboard.orderSteps.deliverySuccessful'),
        status: 'wait',
        icon: <TruckIcon />
      }
    ],
    []
  )

  return (
    <PageContent>
      <h1 className='capitalize text-white text-center lg:text-[64px]'>{t('dashboard.orderDetails')}</h1>
      <section className='flex flex-col md:flex-row mt-14 gap-8 mb-[120px]'>
        <picture className='shrink-0 w-full flex items-center justify-center bg-gradient-to-r rounded-xl h-[756px] from-[#6366F1] to-[#0BF0ED] max-w-[647px]'>
          <source media='(max-width: 799px)' srcset={ProductImage} />
          <source media='(min-width: 800px)' srcset={ProductImage} />
          <img src={ProductImage} alt='Chris standing up holding his daughter Elva' />
        </picture>

        <section className=''>
          <span className='uppercase flex items-center justify-center bg-[#2F9F6B] w-fit text-sm py-[6px] px-[14px] rounded-2xl mb-6'>
            Delivery successful
          </span>
          <h2 className='text-[52px]'>Long Sleeve Jersey with DEVE Logo</h2>
          <div className='flex justify-between border-b-1 border-opacity-70'>
            <span>$49.00</span>
            <span>Quantity: 1</span>
          </div>
        </section>
      </section>
      <ShippingStepper />
      {/* <section className='bg-white p-8 shipping-stepper [&_.ant-steps-icon]:!w-40 [&_.ant-steps-icon]:!h-40 [&_.ant-steps-icon]:!flex [&_.ant-steps-icon]:!items-center [&_.ant-steps-icon]:!justify-center [&_.ant-steps-icon]:rounded-full [&_.ant-steps-icon]:!bg-indigo-500'>
        <Steps current={1} labelPlacement='vertical' items={items} />
      </section> */}
    </PageContent>
  )
}

export default OrderDetailsPage
