import { useState, InputHTMLAttributes } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

interface PasswordToggleFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  inputName: string
  inputError?: FieldError
}

const PasswordToggleField = ({
  inputName,
  label,
  inputError,
  className,
  ...props
}: PasswordToggleFieldProps) => {
  const { register } = useFormContext()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev)
  }

  return (
    <div className="w-full flex flex-col gap-1">
      <label
        htmlFor={inputName}
        className="font-semibold text-text dark:text-text-dark"
      >
        {label}
      </label>
      <div className="relative w-full">
        <input
          id={inputName}
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="Contraseña"
          {...props}
          {...register(inputName)}
          className={`input bg-secondary dark:bg-secondary-dark border-1 border-accent p-3 input-bordered input-md dark:placeholder:text-gray-600 w-full rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent pr-10 ${className}`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent"
        >
          {isPasswordVisible ? (
            <EyeSlashIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <EyeIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {inputError && (
        <p className="mt-1 text-[14px] text-red-500 dark:text-red-400">
          {inputError.message}
        </p>
      )}
    </div>
  )
}

export default PasswordToggleField
