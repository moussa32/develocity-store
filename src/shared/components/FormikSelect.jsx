import React from 'react'
import Select from 'react-select'
import { useField } from 'formik'

const FormikSelect = ({ label, labelClassNames, selectOptions, name, placeholder, required = false, containerClassNames }) => {
  // eslint-disable-next-line no-unused-vars
  const [field, afterAction, helpers] = useField(name)
  const { setValue } = helpers

  return (
    <div className={`${containerClassNames} w-full`}>
      {label && (
        <label className={`ltr:ml-3 rtl:mr-3 mb-2 block capitalize ${labelClassNames ? labelClassNames : 'text-secondary'}`} htmlFor={name}>
          {label}
          {required && <span className='text-indigo-500 text-lg font-bold ltr:ml-1 rtl:mr-1'>*</span>}
        </label>
      )}
      <Select
        defaultValue={selectOptions.find((option) => option.value === field.value)}
        components={{
          IndicatorSeparator: () => null
        }}
        classNames={{
          control: () =>
            `!bg-black !text-white h-[62px] !rounded-sm capitalize ${
              !afterAction.error ? (afterAction.value ? '!border-indigo-500' : '!border-[#3E3E3E]') : '!border-red-500'
            }`,
          menuList: () => 'bg-black',
          option: ({ isFocused }) => `${isFocused ? '!bg-indigo-500' : '!bg-black'} capitalize hover:text-white hover:bg-indigo-500`,
          singleValue: () => '!text-white px-3',
          indicatorsContainer: () =>
            !afterAction.error ? (afterAction.value ? '!background-indigo-500' : '!background-[#3E3E3E]') : '!background-red-500'
        }}
        options={selectOptions}
        placeholder={placeholder}
        onBlur={field.onBlur}
        isSearchable={false}
        onChange={(option) => setValue(option.value)}
      />
      {afterAction.error && afterAction.touched ? <div className='text-red-500 capitalize mt-2'>{afterAction.error}</div> : null}
    </div>
  )
}

FormikSelect.defaultProps = {
  placeholder: ''
}

export default FormikSelect
