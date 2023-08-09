import { memo } from 'react'

const SelectInput = ({ id, name, label, inputClassNames, ...props }) => {
  return (
    <div className='text-white flex items-center justify-center relative'>
      <input
        id={id}
        name={name}
        type='radio'
        {...props}
        className={`${inputClassNames} cursor-pointer z-10 relative peer appearance-none rounded-sm border-1 border-white border-opacity-40 box-content bg-transparent checked:bg-white`}
      />
      {label && (
        <label
          className='font-medium text-lg cursor-pointer z-20 absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 peer-checked:text-indigo-500'
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default memo(SelectInput)
