import ColorInput from '@components/ColorInput'
import { useCallback } from 'react'

const ProductColorAttribute = ({ colors, selectedColor, handleSelectColor }) => {
  const colorOptionsText = useCallback(
    () =>
      colors
        ?.map((color) => color.charAt(0).toUpperCase() + color.slice(1))
        ?.join(' ')
        ?.replaceAll(' ', ', '),
    []
  )

  return (
    <div className='flex flex-col gap-y-4 text-white text-base capitalize'>
      <div className='flex gap-4'>
        Colors: <div className='opacity-[0.42]'>{colorOptionsText()}</div>
      </div>
      <div className='flex gap-4'>
        {colors?.map((color, index) => (
          <ColorInput
            onChange={handleSelectColor}
            checked={selectedColor === color ? true : false}
            key={`${index}${color}`}
            name='color'
            value={color}
            color={color}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductColorAttribute
