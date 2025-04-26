import { InputHTMLAttributes, useEffect } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  inputName: string
  value: string
  symbol?: string
  inputError?: FieldError
}

const TextFieldReadOnly = ({
  label,
  inputName,
  className,
  value,
  symbol,
  inputError,
  ...props
}: TextFieldProps) => {
  const { setValue } = useFormContext()

  useEffect(() => {
    setValue(inputName, value)
  }, [inputName, value, setValue])

  return (
    <div className='w-full flex flex-col gap-1'>
      <label
        htmlFor={inputName}
        className='font-semibold text-gray-600 dark:text-base-content'
      >
        {label}
      </label>
      <div className='flex items-stretch'>
        {symbol && (
          <div className='flex items-center justify-center px-2 border bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-tl rounded-bl'>
            <p className='text-sm'>{symbol}</p>
          </div>
        )}

        <input
          id={inputName}
          {...props}
          readOnly
          value={value}
          onChange={() => {}}
          className={`input input-bordered input-md w-full rounded dark:placeholder:text-gray-600 focus:outline-none ${
            className
          } bg-gray-100 dark:bg-[#2A323C] font-normal text-center text-gray-600 dark:text-gray-400`}
        />
      </div>
      {inputError && (
        <p className='mt-1 text-[14px] text-red-500 dark:text-red-400'>
          {inputError.message}
        </p>
      )}
    </div>
  )
}

export default TextFieldReadOnly
