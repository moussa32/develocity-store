import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as FooterLogo } from '@images/big-logo.svg'
import { ReactComponent as FooterGradient } from '@images/footer-gradient.svg'
import { ReactComponent as Stripe } from '@images/Stripe.svg'
import { ReactComponent as Visa } from '@images/Visa.svg'
import { ReactComponent as Mastercard } from '@images/Mastercard.svg'
import { ReactComponent as Bitpay } from '@images/Bitpay.svg'
import { ReactComponent as Paypal } from '@images/Paypal.svg'
import { fetchFooter } from '@api/global'
import useLanguageQuery from '@hooks/useLanguageQuery'

const Footer = () => {
  const { data: footer } = useLanguageQuery({
    queryKey: ['fetchFooter'],
    fetchFunction: fetchFooter,
    queryOptions: {
      suspense: true,
      useErrorBoundary: true
    }
  })

  return (
    <footer className='relative container pb-20 px-5 mt-12 xl:mt-auto'>
      <FooterGradient className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:transform-none md:-top-[33rem] md:-left-[18rem]' />
      <section className='flex border-t-1 border-white/30 pt-12 justify-center md:justify-between flex-col md:flex-row gap-2 items-center md:items-end z-20 relative'>
        <FooterLogo className='max-w-[334.88px] h-16' />
        <div className='flex gap-2'>
          <Bitpay />
          <Paypal />
          <Stripe />
          <Visa />
          <Mastercard />
        </div>
      </section>
      <section className='flex pt-12 md:pt-6 md:text-xs lg:text-base flex-col gap-y-10 md:flex-row justify-center items-center md:justify-between z-20 relative'>
        <nav>
          <ul className='flex flex-col gap-4 md:gap-2 lg:gap-6 underline justify-center items-center md:list-inside md:list-disc md:flex-row underline-offset-4 capitalize'>
            {footer?.map((footerItem) => (
              <li key={footerItem?.title}>
                <Link to={`/p/${footerItem?.slug}`}>{footerItem?.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <p>© 2022 Develocity, LLC. All Rights Reserved</p>
      </section>
    </footer>
  )
}

export default Footer
