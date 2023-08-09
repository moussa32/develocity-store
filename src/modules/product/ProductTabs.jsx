import parse from 'html-react-parser'
import { Tab } from '@headlessui/react'
import { useTranslation } from 'react-i18next'

const ProductTabs = ({ descriptionTabDetails }) => {
  const { t } = useTranslation('')

  return (
    <Tab.Group>
      <Tab.List className='flex gap-14 mt-12 border-b-1 border-white border-opacity-30'>
        {descriptionTabDetails && (
          <Tab>
            {({ selected }) => (
              <button
                className={`${selected ? 'border-indigo-500' : 'border-transparent'} ring-0 outline-none capitalize py-6 border-b-[3px]`}
              >
                {t('description')}
              </button>
            )}
          </Tab>
        )}
        <Tab>
          {({ selected }) => (
            <button
              className={`${selected ? 'border-indigo-500' : 'border-transparent'} outline-none ring-0 capitalize py-6 border-b-[3px]`}
            >
              {t('shippingAndReturn')}
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels className='mt-6 text-[#C4C4C4]'>
        {descriptionTabDetails && <Tab.Panel>{parse(descriptionTabDetails)}</Tab.Panel>}
        <Tab.Panel>Wait to implement it in API</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export default ProductTabs
