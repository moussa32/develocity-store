import { memo } from 'react'
import styles from '@components/ColorInput.module.css'

const ColorInput = ({ name, color, checked = false, value, onChange, ...props }) => {
  return (
    <input
      className={`appearance-none ${styles.colorInput} cursor-pointer flex items-center justify-center box-content border-2 border-white border-opacity-20 checked:border-opacity-100 checked:border-[#5D4EF2] w-8 h-8 bg-black rounded-full relative overflow-hidden z-10 before:w-[calc(100%-4px)] before:rounded-full before:transform before:left-1/2 before:-translate-x-1/2 before:top-1/2 before:-translate-y-1/2 before:z-20 before:absolute before:h-[calc(100%-4px)]`}
      type='checkbox'
      style={{
        '--before-background-color': color
      }}
      name={name}
      id={name}
      value={value}
      checked={checked}
      onChange={onChange}
      {...props}
    />
  )
}

export default memo(ColorInput)
