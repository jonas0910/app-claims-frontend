import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { FieldError } from 'react-hook-form'

interface DateWithHourFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  inputName: string
  inputError?: FieldError
}

const DateWithHourField = ({
  inputName,
  label,
  inputError,
  className,
  ...props
}: DateWithHourFieldProps) => {
  const { register, setValue } = useFormContext()

  return (
    <div className='w-full flex flex-col gap-1'>
      <label htmlFor={inputName} className='font-medium text-gray-600 dark:text-base-content'>
        {label}
      </label>
      <input
        type='datetime-local'
        id={inputName}
        {...register(inputName, {
          //   valueAsDate: true,
          onChange: (e) => {
            setValue(inputName, e.target.value)
          }
        })}
        {...props}
        className={`input input-bordered input-md w-full rounded focus:outline-none ${
          className
        }`}
      />
      {inputError && (
        <p className='mt-1 text-[14px] text-red-500 dark:text-red-400'>
          {inputError.message}
        </p>
      )}
    </div>
  )
}

export default DateWithHourField
