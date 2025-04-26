import { InputHTMLAttributes } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'

interface NumberFieldDecimalProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  inputName: string
  symbol?: string
  inputError?: FieldError
}

const NumberFieldDecimal = ({
  inputName,
  label,
  symbol,
  className,
  inputError,
  ...props
}: NumberFieldDecimalProps) => {
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
          <div className='flex items-center justify-center px-2 border bg-gray-200 dark:bg-[#191e24] border-gray-300 dark:border-gray-600 rounded-tl rounded-bl'>
            <p className='text-sm'>{symbol}</p>
          </div>
        )}

        <input
          type='number'
          id={inputName}
          {...register(inputName)}
          {...props}
          className={`input w-full input-bordered input-md focus:outline-none rounded dark:text-gray-300 ${
            symbol ? 'rounded-tl-none rounded-bl-none' : ''
          } ${className}`}
          pattern='^\d*\.?\d*$'
          inputMode='numeric'
          //   onInput={(e) => {
          //     e.currentTarget.value = e.currentTarget.value.replace(
          //       /[^0-9.]/g,
          //       ''
          //     )
          //   }}
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

export default NumberFieldDecimal
