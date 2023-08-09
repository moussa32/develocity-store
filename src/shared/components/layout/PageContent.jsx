const PageContent = ({ children, className }) => {
  return <section className={`container z-30 relative mt-[150px] lg:mt-[186px] ${className}`}>{children}</section>
}

export default PageContent
