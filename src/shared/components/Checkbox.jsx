import { memo } from 'react'
import styles from './Checkbox.module.css'

const Checkbox = ({ id, name, checked, onChange, label, wrapperClassName, labelClassName, inputClassName, value, onClick }) => {
  return (
    <div className={`${wrapperClassName} flex gap-2 items-center`}>
      <input
        id={id}
        type='radio'
        className={`${styles.input} grid place-content-center peer appearance-none w-4 h-4 border-white cursor-pointer border-opacity-30 border-1 ${inputClassName}`}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
        onClick={onClick}
      />
      {label && (
        <label htmlFor={id} className={`${labelClassName} peer-checked:text-indigo-500 cursor-pointer block`}>
          {label}
        </label>
      )}
    </div>
  )
}

export default memo(Checkbox)
