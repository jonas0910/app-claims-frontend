import { InputHTMLAttributes } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'

interface TelephoneFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  inputName: string
  symbol?: string
  maxLength?: number
  inputError?: FieldError
}

const TelephoneField = ({
  inputName,
  label,
  symbol,
  className,
  inputError,
  maxLength,
  ...props
}: TelephoneFieldProps) => {
  const { register } = useFormContext()

  return (
    <div className='w-full flex flex-col gap-1'>
      <label
        htmlFor={inputName}
        className='font-semibold text-text dark:text-text-dark'
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
          {...register(inputName)}
          className={`input bg-secondary dark:bg-secondary-dark border-1 border-accent p-3 w-full input-bordered input-md dark:placeholder:text-gray-600 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent rounded  ${symbol ? 'rounded-tl-none rounded-bl-none' : ''
            } ${className}`}
          pattern={maxLength ? `^\\d{6,${maxLength}}$` : '^\\d{6,}$'}
          inputMode='numeric' // Sugiere un teclado numérico en móviles
          minLength={6}
          {...(maxLength ? { maxLength } : {})}
          //maxLength={maxLength} // Evita que se puedan ingresar más de 9 caracteres
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')
          }}
          title='El número de teléfono debe tener entre 6 y 9 dígitos.'
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

export default TelephoneField
