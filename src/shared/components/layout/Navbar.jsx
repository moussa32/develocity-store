import { fetchMenu } from '@api/global'
import { isUserLoggedIn } from '@util/auth'
import { NavLink, useLocation } from 'react-router-dom'
import { memo, useCallback } from 'react'
// import { ReactComponent as AvatarIcon } from '@images/user-avatar.icon.svg'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PiUserCircleLight } from 'react-icons/pi'
import useViewportSize from '@hooks/useViewportSize'
import ChangeLanguage from '@components/layout/ChangeLanguage'
import useLanguageQuery from '@hooks/useLanguageQuery'
import NavbarItem from '@components/layout/NavbarItem'
import LightLogo from '@images/light-logo.svg'
import MobileMenu from '@components/layout/MobileMenu'
import MiniCart from '@modules/cart/MiniCart'
import UserMenu from '@components/layout/UserMenu'

const Navbar = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const isMobile = useViewportSize(768)

  const { data: menu, handleLanguageChange } = useLanguageQuery({
    queryKey: ['fetchMenu'],
    fetchFunction: fetchMenu,
    queryOptions: {
      suspense: true,
      useErrorBoundary: true
    }
  })

  const isHomePage = useCallback(() => {
    if (pathname === '/') {
      return true
    } else {
      return false
    }
  }, [pathname])

  return (
    <header className='container relative h-full'>
      <section
        className={`mx-auto w-[calc(100%_-_30px)] z-50 left-1/2 -translate-x-1/2 transform absolute px-7 items-center justify-between rounded-xl md:h-[82px] md:flex lg:py-7 xl:w-full md:mt-10 ${
          isHomePage() ? 'bg-transparent' : 'bg-white/20'
        }`}
      >
        {!isMobile && (
          <>
            <Link to='/'>
              <img src={LightLogo} alt={t('develoctyStore')} title={t('develoctyStore')} />
            </Link>
            <nav className='flex capitalize items-center gap-x-8 font-medium text-base'>
              {menu?.map((item, index) => (
                <NavbarItem key={`${item?.slug}${index}`} item={item} />
              ))}
              <Link className='hover:text-indigo-500' to='/contact-us'>
                {t('contact')}
              </Link>
              {isUserLoggedIn() ? (
                <UserMenu />
              ) : (
                <NavLink
                  to='/auth'
                  className={({ isActive }) =>
                    `text-white hover:text-indigo-500 ${isActive ? '[&>svg]:fill-current [&>svg]:text-indigo-500' : ''}`
                  }
                >
                  {/* <AvatarIcon /> */}
                  <PiUserCircleLight size={35} />
                </NavLink>
              )}

              <MiniCart />
              <ChangeLanguage handleLanguageChange={handleLanguageChange} />
            </nav>
          </>
        )}
        {isMobile && <MobileMenu handleLanguageChange={handleLanguageChange} />}
      </section>
    </header>
  )
}

export default memo(Navbar)
