const ProductThumbnail = ({ thumbnails, activeThumbnail, handleSelectThumbnail }) => {
  return (
    <div className='flex flex-col md:flex-row md:flex-grow gap-[14px]'>
      {thumbnails.length > 0 && (
        <div className='flex gap-4 relative order-2 md:order-1 flex-row md:flex-col w-[90px]'>
          {thumbnails.map((image, index) => (
            <div
              key={`${index}${image.name}`}
              className='relative cursor-pointer flex-shrink-0 rounded-lg overflow-hidden w-[90px] h-[90px] bg-[#1E1E1E]'
            >
              <img
                className='absolute -bottom-6 w-[70px] left-1/2 transform -translate-x-1/2'
                src={image.src}
                alt={image.alt}
                title={image.name}
                onClick={() => handleSelectThumbnail(image)}
              />
            </div>
          ))}
        </div>
      )}
      <div className='bg-gradient-to-b flex items-center justify-center order-1 md:order-2 h-[350px] md:h-[590px] lg:h-[692px] w-full lg:w-[592px] rounded-xl from-indigo-500 to-[#0BF0ED]'>
        <img
          className='w-full block h-full py-6 max-w-[425px] object-contain'
          src={activeThumbnail?.src}
          alt={activeThumbnail?.alt}
          title={activeThumbnail?.name}
        />
      </div>
    </div>
  )
}

export default ProductThumbnail
