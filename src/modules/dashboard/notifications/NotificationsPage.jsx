import { useTranslation } from 'react-i18next'
import { Tab } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { fetchNotifications, fetchUnreadNotificationsCount } from '@api/notifications'
import { getUserFromCookie } from '@util/auth'
import PageContent from '@components/layout/PageContent'
import NotificationCard from '@modules/dashboard/notifications/NotificationCard'

const NotificationsPage = () => {
  const { t } = useTranslation()
  const userID = useMemo(() => Number(getUserFromCookie.ID), [])

  const { data: notifications } = useQuery({
    queryKey: ['getNotifications'],
    queryFn: () => fetchNotifications(userID),
    suspense: true
  })

  const { data: unReadCount } = useQuery({
    queryKey: ['UnreadNotificationsCount'],
    queryFn: () => fetchUnreadNotificationsCount(userID),
    suspense: true
  })

  const tabsHead = useMemo(
    () => [
      {
        id: 1,
        title: t('all'),
        count: notifications?.length,
        showCount: true
      },
      {
        id: 2,
        title: t('new'),
        count: unReadCount?.unread_notifications_count,
        showCount: true
      },
      {
        id: 3,
        title: t('unread'),
        showCount: false
      }
    ],
    []
  )

  return (
    <PageContent className='mb-[332px]'>
      <h1 className='text-4xl text-center mt-24 ltr:md:text-left rtl:md:text-right md:text-[62px] lg:mt-[108px] capitalize'>
        {t('dashboard.notifications')}
      </h1>
      <Tab.Group defaultIndex={0}>
        <Tab.List className='flex gap-14 mt-[79px] border-b-1 border-white border-opacity-30 mb-20'>
          {tabsHead.map((tabHead) => (
            <Tab>
              {({ selected }) => (
                <button
                  key={`${tabHead?.id}${tabHead?.title}`}
                  className={`${
                    selected ? 'border-indigo-500' : 'border-transparent'
                  } ring-0 flex items-center text-lg lg:text-2xl outline-none capitalize py-6 border-b-[3px]`}
                >
                  <span>{tabHead?.title}</span>
                  {tabHead?.showCount && <span className='block ltr:ml-2 rtl:mr-2 text-white/60'>({tabHead?.count})</span>}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='text-[#C4C4C4]'>
          <Tab.Panel className='flex flex-col gap-12'>
            <NotificationCard
              title='Join Our Store And Get 20% OFF'
              description="As a member of our store you'll get benefits and will be able to track all your orders and activities."
              timestamp='22/6/2023 06:22 PM'
            />
            <NotificationCard
              title='Join Our Store And Get 20% OFF'
              description="As a member of our store you'll get benefits and will be able to track all your orders and activities."
              timestamp='22/6/2023 06:22 PM'
            />
            <NotificationCard
              title='Join Our Store And Get 20% OFF'
              description="As a member of our store you'll get benefits and will be able to track all your orders and activities."
              timestamp='22/6/2023 06:22 PM'
            />
          </Tab.Panel>
          <Tab.Panel className='flex flex-col gap-12'>
            <NotificationCard
              title='Join Our Store And Get 20% OFF'
              description="As a member of our store you'll get benefits and will be able to track all your orders and activities."
              timestamp='22/6/2023 06:22 PM'
            />
            <NotificationCard
              title='Join Our Store And Get 20% OFF'
              description="As a member of our store you'll get benefits and will be able to track all your orders and activities."
              timestamp='22/6/2023 06:22 PM'
            />
            <NotificationCard
              title='Join Our Store And Get 20% OFF'
              description="As a member of our store you'll get benefits and will be able to track all your orders and activities."
              timestamp='22/6/2023 06:22 PM'
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </PageContent>
  )
}

export default NotificationsPage
