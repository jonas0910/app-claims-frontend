import { InputHTMLAttributes } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'

interface NumberFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  inputName: string
  symbol?: string
  inputError?: FieldError
}

const NumberField = ({
  inputName,
  label,
  symbol,
  className,
  inputError,
  ...props
}: NumberFieldProps) => {
  const { register } = useFormContext()

  return (
    <div className='w-full flex flex-col gap-1'>
      {label && (
        <label htmlFor={inputName} className='font-semibold text-text dark:text-text-dark'>
          {label}
        </label>
      )}
      <div className='flex items-stretch border border-accent rounded-md bg-secondary dark:bg-secondary-dark focus-within:ring-1 focus-within:ring-accent'>
        {symbol && (
          <div className='flex items-center justify-center px-3 border-r border-accent bg-gray-200 dark:bg-secondary-dark text-text dark:text-text-dark rounded-l-md'>
            <p className='text-sm'>{symbol}</p>
          </div>
        )}

        <input
          id={inputName}
          {...register(inputName)}
          {...props}
          className={`w-full px-3 py-3 text-text dark:text-text-dark bg-secondary dark:bg-secondary-dark focus:outline-none rounded-md ${symbol ? 'rounded-l-none' : ''} ${className}`}
          pattern='^\d*\.?\d*$' // Solo permite números y decimales
          inputMode='numeric' // Sugerencia de teclado numérico en móviles
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '')
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

export default NumberField
