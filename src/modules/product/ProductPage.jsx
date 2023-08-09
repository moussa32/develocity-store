import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchProductDetails } from '@api/products'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchProductVariantDetails } from '@api/products'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import PageContent from '@components/layout/PageContent'
import Suggestions from '@modules/Suggestions'
import ProductHeader from '@modules/product/ProductHeader'
import NumberInput from '@components/NumberInput'
import useCartStore from '@zustand/useCartStore'
import ProductThumbnail from '@modules/product/ProductThumbnail'
import ProductAttributes from '@modules/product/ProductAttributes'
import ProductTabs from '@modules/product/ProductTabs'
import ProductPageSEO from '@modules/product/ProductPageSEO'
import PrimaryButton from '@components/PrimaryButton'

const ProductPage = () => {
  const { t } = useTranslation('')
  const { productSlug } = useParams()
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedAttributes, setSelectedAttributes] = useState({})
  const [cartMetaData, setCartMetaData] = useState([])
  const [isEnableToAddToCart, setIsEnableToAddToCart] = useState(false)
  const [productQuantity, setProductQuantity] = useState(1)
  const { addItem: addItemToCart, items } = useCartStore((state) => state)

  const [isVariantSelected, setIsVariantSelected] = useState(false)

  const { data: productDetails } = useQuery({
    queryKey: ['getProductDetails', productSlug],
    queryFn: () => fetchProductDetails(productSlug),
    suspense: true
  })

  const {
    data: productVariantDetails,
    refetch: getProductVariantDetails,
    isInitialLoading: isProductVariantInitialLoading,
    isLoading: isProductVariantLoading
  } = useQuery({
    queryKey: ['getProductVariantDetails', productSlug, selectedAttributes],
    queryFn: () => fetchProductVariantDetails(productDetails.id, selectedAttributes),
    onSuccess: (data) => {
      if (data && data.length !== 0) {
        setIsVariantSelected(true)
      } else {
        setIsVariantSelected(false)
      }
    },
    retry: 1,
    enabled: false
  })

  const [activeThumbnail, setActiveThumbnail] = useState(productDetails?.images[0])

  const handleSelectAttribute = useCallback(
    (attributeName, attributeValue) => {
      let attributeObjectKey = `attributes[${attributeName}]`

      setCartMetaData([...cartMetaData, { key: attributeName, value: attributeValue }])
      setSelectedAttributes({ ...selectedAttributes, [attributeObjectKey]: attributeValue.toLowerCase() })
    },
    [selectedAttributes]
  )

  const handleSelectThumbnail = useCallback((image) => {
    setActiveThumbnail(image)
  }, [])

  useEffect(() => {
    if (Object.entries(selectedAttributes).length > 0) {
      getProductVariantDetails()
      setIsEnableToAddToCart(true)
    } else {
      setIsEnableToAddToCart(false)
    }
  }, [selectedAttributes])

  const handleAddToCart = useCallback(() => {
    toast(t('cart.productHasBeenAddedSuccessfully'), { type: 'success' })
    if (isVariantSelected) {
      addItemToCart({
        id: uuidv4(),
        slug: productDetails.slug,
        product: { product_id: productDetails.id, quantity: productQuantity, variation_id: productVariantDetails.variation_id },
        name: productDetails?.name,
        price: Number(productVariantDetails?.display_price),
        images: productDetails?.images
      })
    } else {
      //If user select attributes don't belong to any variation
      const meta_data = Object.entries(selectedAttributes).map(([attributeKey, attributeValue]) => {
        return {
          key: attributeKey.split('[').at(-1).slice(0, -1),
          value: attributeValue.split('[').at(-1).slice(0, -1)
        }
      })
      addItemToCart({
        id: uuidv4(),
        slug: productDetails.slug,
        product: { product_id: productDetails.id, quantity: productQuantity, meta_data: meta_data },
        name: productDetails?.name,
        price: Number(productDetails?.price),
        images: productDetails?.images
      })
    }
  }, [isVariantSelected, selectedAttributes, productDetails, productVariantDetails, productQuantity])

  return (
    <>
      <ProductPageSEO
        pageTitle={productDetails?.yoast_head_json ? productDetails.yoast_head_json.title : productDetails.name}
        ogTitle={productDetails.yoast_head_json ? productDetails.yoast_head_json.title : productDetails.name}
        ogImage={
          productDetails.yoast_head_json && productDetails.yoast_head_json?.og_image ? productDetails.yoast_head_json.og_image.url : null
        }
      />
      <PageContent>
        <section className='flex flex-col lg:flex-row gap-8'>
          <ProductThumbnail
            thumbnails={productDetails?.images}
            handleSelectThumbnail={handleSelectThumbnail}
            activeThumbnail={activeThumbnail}
          />
          <div className='flex-grow'>
            <ProductHeader
              categories={productDetails?.categories}
              name={productDetails?.name}
              isPriceLoading={isProductVariantInitialLoading}
              price={
                productVariantDetails && productVariantDetails?.display_price ? productVariantDetails?.display_price : productDetails?.price
              }
            />
            <ProductAttributes
              attributes={productDetails?.attributes}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              handleSelectAttribute={handleSelectAttribute}
            />
            <div className='flex gap-3 mt-[33px]'>
              <NumberInput
                defaultValue={productQuantity}
                onIncrement={setProductQuantity}
                onDecrement={setProductQuantity}
                max={productVariantDetails?.max_qty ? productVariantDetails?.max_qty : productDetails?.stock_quantity}
                min={productVariantDetails?.min_qty}
              />
              <PrimaryButton
                onClick={handleAddToCart}
                disabled={!isEnableToAddToCart || isProductVariantLoading}
                loading={isProductVariantInitialLoading}
                text={t('addToCart')}
                className='rounded-sm text-xl bg-indigo-500 !text-white h-[62px] flex items-center justify-center flex-[75%] disabled:opacity-75 disabled:cursor-not-allowed'
              />
            </div>
            <ProductTabs descriptionTabDetails={productDetails?.description} />
          </div>
        </section>
        {productDetails?.related_products && productDetails?.related_products.length > 0 && (
          <Suggestions className='mt-24 relative z-20 mb-[111px]' products={productDetails.related_products} />
        )}
      </PageContent>
    </>
  )
}

export default ProductPage
