import { InputHTMLAttributes } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'

interface DocumentNumberFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  inputName: string
  symbol?: string
  inputError?: FieldError
}

const DocumentNumberField = ({
  inputName,
  label,
  symbol,
  className,
  inputError,
  ...props
}: DocumentNumberFieldProps) => {
  const { register } = useFormContext()

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
          <div className='flex items-center justify-center px-2 border bg-gray-200 border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded-tl rounded-bl'>
            <p className='text-sm'>{symbol}</p>
          </div>
        )}

        <input
          id={inputName}
          {...props}
          {...register(inputName)}
          className={`input w-full input-bordered input-md focus:outline-none rounded dark:placeholder:text-gray-600 ${
            symbol ? 'rounded-tl-none rounded-bl-none' : ''
          } ${className}`}
          pattern='^[a-zA-Z0-9\-]+$'
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(
              /[^a-zA-Z0-9\-]/g,
              ''
            )
          }}
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

export default DocumentNumberField
