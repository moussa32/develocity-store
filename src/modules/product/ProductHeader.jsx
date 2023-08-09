import { Link } from 'react-router-dom'

const ProductHeader = ({ categories, name, isPriceLoading, price }) => {
  return (
    <section className='mb-[26px]'>
      <div className='flex gap-2'>
        {categories &&
          categories.length > 0 &&
          categories.map((category) => (
            <Link
              key={`${category?.id}${category?.name}`}
              to={{ pathname: `/products`, search: `?category=${category?.slug}` }}
              className='text-indigo-500 bg-white py-[5px] flex items-center justify-center px-4 rounded-full uppercase transition-all duration-500 hover:bg-indigo-500 hover:text-white'
            >
              {category.name}
            </Link>
          ))}
      </div>
      <div className='mt-6 border-b-1 border-white border-opacity-30 pb-6'>
        <h1 className='text-4xl lg:text-5xl pb-2'>{name}</h1>
        {price && <span className='text-2xl mt-1 block'>{isPriceLoading ? 'Loading....' : `$${Number(price).toFixed(2)}`}</span>}
      </div>
    </section>
  )
}

export default ProductHeader
