import { Menu, Transition } from '@headlessui/react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { Fragment, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export default function ChangeLanguage({ handleLanguageChange }) {
  const { t, i18n } = useTranslation()
  const supportedLanguages = useMemo(
    () => [
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/323/323329.png?w=826&t=st=1691266766~exp=1691267366~hmac=c45ccaf5710bcbf9310d51bda0d1ae4bfc8167a783783c9fb6f1a47f67cfd22f',
        code: 'en',
        name: t('languages.english')
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/323/323301.png?w=826&t=st=1691266937~exp=1691267537~hmac=d25e7757d0091fcb599adf3b6affca6d10dcd0d8b6a33bf1ced278ad2a0977c1',
        code: 'ar',
        name: t('languages.arabic')
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/323/323365.png?w=826&t=st=1691267048~exp=1691267648~hmac=b795df2eaefe06a011483db59f03ef128cbf324fcbcb488bfae252d30e9095e6',
        code: 'es',
        name: t('languages.spanish')
      },
      ,
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/323/323363.png?w=826&t=st=1691267522~exp=1691268122~hmac=f2cb75c6bf440adc2c535601ad840066ebcf78a22baa4b216ddfd2dd7305322f',
        code: 'cn',
        name: t('languages.china')
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/323/323300.png?w=826&t=st=1691267564~exp=1691268164~hmac=e40049e072980a67d1671759cd1565864de59acc38b726f9b87791301be3fabb',
        code: 'ru',
        name: t('languages.russian')
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/197/197560.png?w=826&t=st=1691267065~exp=1691267665~hmac=f5e4fc95a103a7d15b49ceecfdce9e5da4d0d13fc07c2b05b132c47206548b30',
        code: 'fr',
        name: t('languages.french')
      }
    ],
    [t]
  )

  const onChangeLanguage = (selectedLanguage) => {
    handleLanguageChange(selectedLanguage.code)
  }

  return (
    <div>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='inline-flex w-full uppercase items-center justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-lg font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            {i18n.language}
            <MdOutlineKeyboardArrowDown className='ltr:ml-2 rtl:mr-2 ltr:-mr-1 rtl:-ml-1 h-5 w-5 text-violet-200 hover:text-violet-100' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute p-4 ltr:right-0 rtl:left-0 mt-2 w-56 ltr:origin-top-right rtl:origin-top-left rounded-md bg-neutral-950/70 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <h2 className='uppercase text-[#4dcdc8] text-center'>{t('navbar.selectLanguage')}</h2>
            {supportedLanguages.map((language, index) => (
              <Menu.Item key={`${language.name}${index}`}>
                <button
                  onClick={() => onChangeLanguage(language)}
                  className={`hover:bg-gradient-to-r hover:from-[#2A51BC] hover:to-[#51D8CA] uppercase bg-white/5 mt-3 gap-4 group flex w-full items-center rounded-md p-3 py-2 text-sm`}
                >
                  <img
                    className='w-8 object-cover border-2 border-white rounded-full'
                    src={language.icon}
                    alt={language.name}
                    title={language.name}
                  />
                  {language.name}
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
