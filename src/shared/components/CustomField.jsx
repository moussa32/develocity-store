const CustomField = ({
  field,
  label,
  name,
  id,
  required = false,
  value,
  form: { touched, errors },
  inputClassNames,
  containerClassNames,
  labelClassNames,
  InputType = 'input',
  height = 62,
  ...props
}) => {
  return (
    <div className={`${containerClassNames} w-full`}>
      {label && (
        <label className={`ltr:ml-3 rtl:mr-3 mb-2 block capitalize ${labelClassNames ? labelClassNames : 'text-secondary'}`} htmlFor={name}>
          {label}
          {required && <span className='text-indigo-500 text-lg font-bold ltr:ml-1 rtl:mr-1'>*</span>}
        </label>
      )}
      <InputType
        className={`${errors[field.name] && touched[field.name] ? 'border-red-500' : null} ${
          touched[field.name] && !errors[field.name] ? 'border-indigo-500' : null
        } block bg-transparent h-[${height}px] w-full py-5 border-1 border-[#3E3E3E] rounded-sm px-6 outline-none focus:border-white ${inputClassNames}`}
        {...field}
        {...props}
      />
      {errors[field.name] && touched[field.name] ? <div className='text-red-500 capitalize mt-2'>{errors[field.name]}</div> : null}
    </div>
  )
}

export default CustomField
