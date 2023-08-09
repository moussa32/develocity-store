import SelectInput from '@components/SelectInput'
import ProductColorAttribute from '@modules/product/ProductColorAttribute'
import { memo } from 'react'

const ProductAttributes = ({ attributes, selectedColor, setSelectedColor, handleSelectAttribute }) => {
  return (
    <div className='flex flex-col gap-[42px]'>
      {attributes?.map((attribute) => {
        if (attribute?.name?.startsWith('color')) {
          return (
            <ProductColorAttribute
              key={attribute?.name}
              handleSelectColor={(event) => {
                handleSelectAttribute('colors', event.target.value)
                setSelectedColor(event.target.value)
              }}
              selectedColor={selectedColor}
              colors={attribute?.options}
            />
          )
        } else if (attribute?.name?.startsWith('size')) {
          return (
            <div key={`${attribute?.name}`}>
              <div className='flex items-center justify-between text-white text-base'>
                <span>Select Size:</span>
                <span className='underline-offset-4 underline underline-white'>Size Guide</span>
              </div>
              <div className='flex items-center gap-3 mt-[13px]'>
                {attribute?.options.map((size, index) => (
                  <SelectInput
                    inputClassNames='w-[72px] h-[48px]'
                    key={`${size}${index}`}
                    id={size}
                    value={size}
                    label={size.charAt(0)}
                    onClick={() => handleSelectAttribute(attribute?.name, size)}
                    name='size'
                  />
                ))}
              </div>
            </div>
          )
        } else {
          return (
            <div key={`${attribute?.name}`}>
              <div className='flex items-center justify-between text-white text-base'>
                <span>{attribute?.name}:</span>
              </div>
              <div className='flex items-center gap-3 mt-[13px]'>
                {attribute?.options.map((option, index) => (
                  <SelectInput
                    inputClassNames='w-[72px] h-[48px]'
                    key={`${option}${index}`}
                    id={option}
                    value={option}
                    label={option}
                    name='option'
                  />
                ))}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default memo(ProductAttributes)
