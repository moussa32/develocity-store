import { Helmet } from 'react-helmet'

const ProductPageSEO = ({ pageTitle, ogTitle, ogImage }) => {
  return (
    <Helmet>
      <meta charSet='utf-8' />
      {pageTitle && <title>{pageTitle}</title>}
      {ogTitle && <meta property='og:title' content={ogTitle} />}
      {ogImage && <meta property='og:image' content={ogImage} />}
    </Helmet>
  )
}

export default ProductPageSEO
