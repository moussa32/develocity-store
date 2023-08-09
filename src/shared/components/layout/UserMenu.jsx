import { Button, Popover } from 'antd'
// import { ReactComponent as AvatarIcon } from '@images/user-avatar.icon.svg'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import Cookies from 'js-cookie'
import { PiUserCircleLight } from 'react-icons/pi'
import { Disclosure } from '@headlessui/react'

const UserMenu = ({ iconSize = 35 }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (location) {
      setIsOpen(false)
    }
  }, [location])

  const logOut = () => {
    Cookies.remove('user')
    navigate('/auth')
  }

  return (
    <div className='relative'>
      <div className='relative cursor-pointer z-10 !font-sans !text-sm' onClick={() => setIsOpen(!isOpen)}>
        <PiUserCircleLight className='hover:text-indigo-500' size={iconSize} />
      </div>
      {isOpen && (
        <Popover
          placement='bottom'
          open={isOpen}
          className='absolute top-0 right-0 w-full h-full'
          align={{ targetOffset: ['0', '-40%'] }}
          content={
            <nav className='p-6 justify-center items-center flex flex-col gap-x-12 gap-y-2 w-[200px]'>
              <Disclosure as='ul' className='flex flex-col gap-y-4 items-center justify-center w-full capitalize'>
                <Disclosure.Button as={Link} className='hover:text-indigo-500' to='/dashboard/orders'>
                  {t('orders')}
                </Disclosure.Button>
                <Disclosure.Button as={Link} className='hover:text-indigo-500' to='/dashboard/settings'>
                  {t('settings')}
                </Disclosure.Button>
                <Disclosure.Button as={Link} className='hover:text-indigo-500' to='/dashboard/notifications'>
                  {t('notifications')}
                </Disclosure.Button>
                <Disclosure.Button
                  as={Button}
                  className='w-full mt-4 capitalize flex items-center justify-center'
                  onClick={logOut}
                  icon={<FiLogOut />}
                >
                  {t('logout')}
                </Disclosure.Button>
              </Disclosure>
            </nav>
          }
        />
      )}
    </div>
  )
}

export default memo(UserMenu)
