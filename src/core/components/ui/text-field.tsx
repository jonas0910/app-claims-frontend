import { InputHTMLAttributes } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  inputName: string
  inputError?: FieldError
}

const TextField = ({
  label,
  inputName,
  className,
  inputError,
  ...props
}: TextFieldProps) => {
  const { register } = useFormContext()

  return (
    <div className='w-full flex flex-col gap-1'>
      <label
        htmlFor={inputName}
        className='font-semibold text-text dark:text-text-dark'
        // className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300'
      >
        {label}
      </label>
      <input
        id={inputName}
        {...register(inputName)}
        {...props}
        className={`border text-text dark:text-text-dark bg-secondary dark:bg-secondary-dark border-accent rounded-md px-3 py-3 focus:outline-none focus:ring-1 focus:ring-accent ${className}`}
      />
      {inputError && (
        <p className='mt-1 text-[14px] text-red-500 dark:text-red-400'>
          {inputError.message}
        </p>
      )}
    </div>
  )
}

export default TextField
