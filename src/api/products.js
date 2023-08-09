import axios from 'axios'
import { storeBaseURL } from './constants'

const fetchAttributes = () => axios.get(`${storeBaseURL}/products/attributes`).then((data) => data.data)

const fetchProductDetails = (productSlug) =>
  axios
    .get(`${storeBaseURL}/products`, {
      params: {
        slug: productSlug
      }
    })
    .then((data) => data.data[0])

const fetchProductVariants = (productId) => axios.get(`${storeBaseURL}/products/${productId}/variations`, {}).then((data) => data.data[0])

const fetchProductVariantDetails = (productId, attributes) =>
  axios
    .get(`${storeBaseURL}/variations`, {
      params: {
        product_id: productId,
        ...attributes
      }
    })
    .then((data) => data.data)

const fetchProducts = (lang, filters) =>
  axios.get(`${storeBaseURL}/products`, {
    params: {
      lang,
      ...filters
    }
  })

const fetchPopularProducts = (lang) =>
  axios
    .get(`${storeBaseURL}/products`, {
      params: {
        lang,
        orderby: 'popularity'
      }
    })
    .then((data) => data.data)

const fetchCollection = (lang) => axios.get(`${storeBaseURL}/new-collection`, { params: { lang } }).then((data) => data.data)

export {
  fetchProductDetails,
  fetchProducts,
  fetchAttributes,
  fetchPopularProducts,
  fetchProductVariants,
  fetchProductVariantDetails,
  fetchCollection
}
