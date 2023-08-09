import { useTranslation } from 'react-i18next'
import { useCallback, useState } from 'react'
import { Empty } from 'antd'
import { fetchCategories } from '@api/categories'
import { StringParam, useQueryParam } from 'use-query-params'
import { fetchProducts } from '@api/products'
import { fetchAttributes } from '@api/products'
import { useLocation, useNavigate } from 'react-router-dom'
import FilterHeading from './FilterHeading'
import ProductCard from '@components/ProductCard'
import Checkbox from '@components/Checkbox'
import PageLoader from '@components/PageLoader'
import ColorInput from '@components/ColorInput'
import PageContent from '@components/layout/PageContent'
import useLanguageQuery from '@hooks/useLanguageQuery'

const ProductsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { t } = useTranslation()
  const [filters, setFilters] = useState([])

  const [selectedColor, setSelectedColor] = useState(null)
  const [categoryFilter, setCategoryFilter] = useQueryParam('category', StringParam)
  const [stockFilter, setStockFilter] = useQueryParam('stock_status', StringParam)
  const [colorFilter, setColorFilter] = useQueryParam('color', StringParam)

  console.log(filters)

  const { data: categories } = useLanguageQuery({
    queryKey: ['getCategories'],
    fetchFunction: fetchCategories,
    queryOptions: {
      suspense: true,
      useErrorBoundary: true
    }
  })

  const { data: attributes } = useLanguageQuery({
    queryKey: ['getAttributes'],
    fetchFunction: fetchAttributes,
    queryOptions: {
      suspense: true,
      useErrorBoundary: true
    }
  })

  const { data, isLoading, isFetched } = useLanguageQuery({
    queryKey: ['getProducts', categoryFilter, stockFilter],
    fetchFunction: fetchProducts,
    queryOptions: {
      useErrorBoundary: true,
      retry: 3
    },
    params: { category_slug: categoryFilter, stock_status: stockFilter, color: colorFilter }
  })

  const handleCategoryFilter = (event) => {
    const { value, checked } = event.target
    if (value && checked) {
      setCategoryFilter(value)
    } else {
      setCategoryFilter(null)
    }
  }

  const handleColor = useCallback(
    (event) => {
      setColorFilter(selectedColor === event.target.value ? null : event.target.value)
      setSelectedColor(selectedColor === event.target.value ? null : event.target.value)
    },
    [selectedColor]
  )

  const handleStockFilter = (event) => {
    const { value, checked } = event.target

    if (value && checked) {
      setStockFilter(value)
    } else {
      setStockFilter(null)
    }
  }

  const handleDynamicFilters = useCallback(
    (attributeName, attributeValue) => {
      const searchParams = new URLSearchParams(location.search)
      console.log(searchParams.get(attributeName), attributeValue)

      if (searchParams.get(attributeName) === attributeValue) {
        // Deselect the attributeName if it has the same value
        searchParams.delete(attributeName)
      } else {
        // Select the attributeName with the new value
        searchParams.set(attributeName, attributeValue)
      }

      const keyValueArray = []
      searchParams.forEach((value, key) => {
        keyValueArray.push({ key, value })
      })

      console.log(`?${searchParams.toString()}`)

      setFilters(keyValueArray)

      const newSearch = `?${searchParams.toString()}`

      navigate({
        pathname: location.pathname,
        search: newSearch
      })
    },
    [filters, location]
  )

  return (
    <PageContent className='mb-32'>
      <h1 className='capitalize text-white text-center text-2xl sm:text-[64px]'>
        {categoryFilter ? `${categoryFilter} ${t('productsPage.products')}` : t('allProducts')}
      </h1>
      <div className='flex flex-col md:flex-row gap-8 mt-14'>
        <aside className='flex-grow-[1] flex-shrink-0 basis-[100%] w-full md:max-w-[200px] lg:max-w-[280px]'>
          <div className='flex-col gap-6 [&:not(:first-child)]:mt-10 mb-10'>
            <FilterHeading text={t('productsPage.availability')} />
            <div className='mt-6 flex flex-col gap-[14px]'>
              <Checkbox
                id='instock'
                checked={stockFilter === 'instock'}
                value='instock'
                onChange={handleStockFilter}
                name='inStock'
                labelClassName={`text-[#B2B2B2] capitalize`}
                label={t('inStock')}
              />
              <Checkbox
                id='outofstock'
                checked={stockFilter === 'outofstock'}
                onChange={handleStockFilter}
                value='outofstock'
                name='outOfStock'
                labelClassName={`text-[#B2B2B2] capitalize`}
                label={t('outOfStock')}
              />
            </div>
          </div>
          <div className='flex-col gap-6 [&:not(:first-child)]:mt-10 mb-10'>
            <FilterHeading text={t('productsPage.categories')} />
            <div className='mt-6 flex flex-col gap-[14px]'>
              {categories.map((category) => (
                <Checkbox
                  key={`${category.slug}${category.id}`}
                  id={category.slug}
                  value={category.slug}
                  checked={categoryFilter === category.slug ? true : false}
                  name='category'
                  onChange={handleCategoryFilter}
                  labelClassName={`text-[#B2B2B2] capitalize`}
                  label={`${category.name} (${category.count})`}
                />
              ))}
            </div>
          </div>
          {attributes.map((attribute) => (
            <div key={`${attribute.name}${attribute.slug}`} className='flex-col gap-6 [&:not(:first-child)]:mt-10 mb-10'>
              <FilterHeading text={attribute.name} />
              <div className={`mt-6 flex ${attribute.name.includes('colors') ? 'flex-row' : 'flex-col'} gap-[14px]`}>
                {attribute.name.includes('colors')
                  ? attribute?.options?.map((option) => (
                      <>
                        <ColorInput
                          onChange={handleColor}
                          checked={selectedColor === option.name || colorFilter === option.name ? true : false}
                          value={option.name}
                          name={attribute.name}
                          color={option.name}
                          labelClassName={`text-[#B2B2B2] capitalize`}
                          label={option.name}
                        />
                      </>
                    ))
                  : attribute?.options?.map((option) => (
                      <Checkbox
                        type='radio'
                        id={option.name}
                        value={option.name}
                        name={attribute.name}
                        labelClassName={`text-[#B2B2B2] capitalize`}
                        label={option.name}
                        checked={filters.some((filter) => filter.value === option.name)} // Compare the attributeValue with the currently selected value for the attributeName
                        onClick={() => {
                          handleDynamicFilters(attribute.slug, option.name)
                        }}
                      />
                    ))}
              </div>
            </div>
          ))}
        </aside>

        <section className='flex xl:flex-shrink-0 gap-8 relative w-full flex-wrap'>
          {isLoading && (
            <div className='mt-12 relative w-full'>
              <PageLoader className='left-[100%]' />
            </div>
          )}
          {isFetched && data.data.length > 0
            ? data.data.map((item, index) => (
                <ProductCard product={item} className='max-w-[250px] lg:max-w-[280px] mx-auto md:mx-0 basis-[280px] w-full' key={index} />
              ))
            : isFetched &&
              data &&
              data.data.length === 0 && (
                <Empty
                  className=' [&_.ant-empty-description]:text-white mx-auto [&_.ant-empty-description]:capitalize xl:absolute xl:top-[150px] xl:left-1/2 xl:transform xl:-translate-x-1/2 xl:-translate-y-1/2'
                  description={t('noProductsInThisCategory')}
                />
              )}
        </section>
      </div>
    </PageContent>
  )
}

export default ProductsPage
