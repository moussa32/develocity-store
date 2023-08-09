import { Popover } from 'antd'
import { ReactComponent as DropdownArrow } from '@images/arrow-right.svg'
import { Link, useLocation } from 'react-router-dom'
import { memo, useEffect, useState } from 'react'

const NavbarItem = ({ item }) => {
  const { pathname } = useLocation()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  if (item.submenu.length === 0) {
    return (
      <Link
        to={
          item?.type?.includes('category')
            ? { pathname: `/products`, search: `?category=${item?.slug}` }
            : `${item?.slug.startsWith('home') ? '' : item?.slug}`
        }
        className='hover:text-indigo-500'
      >
        {item?.title}
      </Link>
    )
  } else {
    return (
      <div className='relative'>
        <div className='relative cursor-pointer !font-sans !text-sm' onClick={() => setOpen(!open)}>
          <div className='inline-flex capitalize w-full justify-center text-base'>
            {item?.title}
            <DropdownArrow className='ltr:ml-2 rtl:mr-2 ltr:-mr-1 rtl:-ml-1 h-5' aria-hidden='true' />
          </div>{' '}
        </div>
        {open && (
          <Popover
            placement='bottom'
            open={open}
            className='block w-full top-0 right-0'
            align={{ targetOffset: ['0', '-40%'] }}
            content={
              <div className='p-6 justify-center items-center flex flex-col gap-x-12 gap-y-2 w-[200px]'>
                {item.submenu.map((subMenuItem) => (
                  <Link
                    key={subMenuItem?.slug}
                    className='text-sm text-[#848388] capitalize'
                    to={{ pathname: `/products`, search: `?category=${subMenuItem?.title}` }}
                  >
                    {subMenuItem?.title}
                  </Link>
                ))}
              </div>
            }
          />
        )}
      </div>
    )
  }
}

export default memo(NavbarItem)
