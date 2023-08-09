import { Link } from 'react-router-dom'
import { fetchFeatureCategories } from '@api/categories'
import useLanguageQuery from '@hooks/useLanguageQuery'

const Categories = () => {
  const { data: featuredCategories } = useLanguageQuery({
    queryKey: ['getFeatureCategories'],
    fetchFunction: fetchFeatureCategories,
    queryOptions: { suspense: true }
  })

  return (
    <section className='container py-24'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {featuredCategories.map((item, index) => (
          <Link
            to={{ pathname: `/products`, search: `?category=${item?.slug}` }}
            className='w-full cursor-pointer relative rounded-xl lg:basis-[384px] lg:max-w-[384px] overflow-hidden h-80 lg:h-[464px] block'
            key={index}
          >
            <img
              className='absolute object-cover h-full w-full z-0'
              src={item?.image?.src}
              alt={item?.image?.alt}
              title={item?.image?.name}
            />
            <h2 className='absolute w-full bottom-0 flex flex-col backdrop-blur-xl justify-center items-center mt-auto z-20 text-4xl capitalize py-4'>
              {item?.name}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Categories
