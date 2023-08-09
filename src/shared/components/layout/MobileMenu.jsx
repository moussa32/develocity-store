import { memo } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { FiMenu } from 'react-icons/fi'
import { Link, NavLink } from 'react-router-dom'
import LightLogo from '@images/light-logo.svg'
import { useTranslation } from 'react-i18next'
import { isUserLoggedIn } from '@util/auth'
import { PiUserCircleLight } from 'react-icons/pi'
import UserMenu from '@components/layout/UserMenu'
import MiniCart from '../../../modules/cart/MiniCart'
import ChangeLanguage from './ChangeLanguage'

const MobileMenu = ({ handleLanguageChange }) => {
  const { t } = useTranslation()

  return (
    <Disclosure as='nav'>
      {({ open }) => (
        <div
          className={`fixed transition pt-7 w-screen left-[-15px] ease-in-out duration-700 ${
            open ? 'bg-indigo-500 pt-0' : ''
          } w-full lg:hidden z-50 text-white`}
        >
          <div className='mx-4 py-4 max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <Link to='/'>
                <img src={LightLogo} alt={t('develoctyStore')} title={t('develoctyStore')} />
              </Link>
              <div className='absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center'>
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-neutral-300 hover:bg-opacity-5 hover:bg-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <FiMenu size={40} />
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Transition
            enter='transition duration-150 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-150 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
          >
            <Disclosure.Panel className='bg-gradient-to-b from-[#0A0C14] to-[#292156]'>
              <div className='space-y-1 text-center px-2 capitalize pt-4 pb-3'>
                <Disclosure.Button
                  as={Link}
                  to='/'
                  className='block px-3 py-2 rounded-md text-white text-lg font-medium hover:bg-slate-900/75'
                >
                  {t('navbar.home')}
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  to='/products/apparel'
                  className='block px-3 py-2 rounded-md text-white text-lg font-medium hover:bg-slate-900/75'
                >
                  {t('navbar.apparel')}
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  to='/products/lifestyle'
                  className='block px-3 py-2 rounded-md text-white text-lg font-medium hover:bg-slate-900/75'
                >
                  {t('navbar.lifestyle')}
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  className='block px-3 py-2 rounded-md text-white text-lg font-medium hover:bg-slate-900/75'
                  to='/products/drops'
                >
                  {t('navbar.drops')}
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  className='block px-3 py-2 rounded-md text-white text-lg font-medium hover:bg-slate-900/75'
                  to='/contact-us'
                >
                  {t('contact')}
                </Disclosure.Button>
                <div className='flex gap-4 justify-center items-center py-6'>
                  {isUserLoggedIn() ? (
                    <UserMenu iconSize={45} />
                  ) : (
                    <Disclosure.Button
                      as={NavLink}
                      to='/auth'
                      className={({ isActive }) =>
                        `text-white hover:text-indigo-500 ${isActive ? '[&>svg]:fill-current [&>svg]:text-indigo-500' : ''}`
                      }
                    >
                      <PiUserCircleLight size={45} />
                    </Disclosure.Button>
                  )}
                  <MiniCart cartIconClassName='w-8 h-8' />
                  <ChangeLanguage handleLanguageChange={handleLanguageChange} />
                </div>
              </div>
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  )
}

export default memo(MobileMenu)
