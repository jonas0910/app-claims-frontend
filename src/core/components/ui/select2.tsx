import { SelectHTMLAttributes } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  inputName: string
  // value tiene que ser number
  options: { value: string | number; label: string }[]
  inputError?: FieldError
  maxWidth?: string
  handleChange?: () => void
  initialValue?: string
}

const Select2 = ({
  label,
  inputName,
  options,
  inputError,
  maxWidth = 'w-full',
  handleChange,
  initialValue,
  ...props
}: SelectProps) => {
  const { register } = useFormContext()

  return (
    <div className={`flex flex-col gap-1 ${maxWidth}`}>
      {label && (
        <label
          htmlFor={inputName}
          className='font-normal text-gray-600 dark:text-base-content'
        >
          {label}
        </label>
      )}
      <select
        className='select select-bordered select-sm w-full focus:outline-none text-xs placeholder:text-gray-400 dark:placeholder:text-gray-400'
        id={inputName}
        {...register(inputName, {
          onChange: handleChange
        })}
        {...props}
      >
        <option disabled value={initialValue || ''} className='text-xs'>
          {initialValue || 'Seleccione:'}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className='text-xs'>
            {opt.label}
          </option>
        ))}
      </select>
      {inputError && (
        <p className='mt-1 text-[14px] text-red-500 dark:text-red-400'>
          {inputError.message}
        </p>
      )}
    </div>
  )
}

export default Select2
