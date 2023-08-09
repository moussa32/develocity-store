import { useTranslation } from 'react-i18next'
import { ReactComponent as Airplane } from '@images/airplane-icon.svg'
import { ReactComponent as Security } from '@images/security-logo.svg'
import { ReactComponent as Crypto } from '@images/crypto-logo.svg'
import { ReactComponent as MerchDrops } from '@images/merch-drops-logo.svg'
import { useMemo } from 'react'

const Features = () => {
  const { t } = useTranslation()
  const items = useMemo(
    () => [
      { icon: Airplane, title: t('homePage.freeShipping'), description: t('homePage.freeShippingDescription') },
      { icon: Security, title: t('homePage.security'), description: t('homePage.securityDescription') },
      { icon: Crypto, title: t('homePage.crypto'), description: t('homePage.cryptoDescription') },
      { icon: MerchDrops, title: t('homePage.merchDrops'), description: t('homePage.merchDropsDescription') }
    ],
    [t]
  )

  return (
    <section className='container relative z-20 py-24'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-14'>
        {items.map((item, index) => (
          <div className='flex flex-col items-center lg:h-[186.43px]' key={index}>
            <item.icon className='basis-16 flex-shrink-0' />
            <div className='text-center mt-9'>
              <h2 className='text-xl sm:text-2xl text-indigo-500 capitalize mb-3'>{item.title}</h2>
              <p className='max-w-[174px] text-sm text-center mx-auto'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
