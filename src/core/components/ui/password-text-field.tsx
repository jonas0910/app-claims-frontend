import React, { useEffect, useState } from 'react'
// import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import { FieldError, useFormContext } from 'react-hook-form'

interface PasswordTextFieldProps {
  label?: string
  inputName: string
  password: string
  setPassword: (password: string) => void
  placeholder: string
  buttonText?: string
  onButtonClick?: () => void
  showPassword?: boolean
  setShowPassword?: (show: boolean) => void
  hideButton?: boolean
  inputError?: FieldError
}

const PasswordTextField = ({
  label,
  inputName,
  password,
  setPassword,
  placeholder,
  showPassword,
  // setShowPassword,
  inputError
}: PasswordTextFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(
    showPassword || false
  )

  const { register, setValue, clearErrors } = useFormContext() // Obtener funciones de react-hook-form

  useEffect(() => {
    setIsPasswordVisible(showPassword || false)
  }, [showPassword])

  // const togglePasswordVisibility = () => {
  //   setIsPasswordVisible(!isPasswordVisible)
  //   if (setShowPassword) setShowPassword(!isPasswordVisible)
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value) // Actualizar el estado del password
    setValue(inputName, e.target.value) // Actualizar el valor en react-hook-form
    clearErrors(inputName) // Limpiar errores si hay
  }

  return (
    <div className='w-full flex flex-col gap-1'>
      <label htmlFor={inputName} className='font-semibold text-text dark:text-text-dark'>
        {label}
      </label>
      <div className='flex items-center'>
        {/* Contenedor del campo de entrada y el botón del ojo */}
        <div className='relative flex items-center w-full'>
          <input
            id={inputName}
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder={placeholder}
            value={password}
            {...register(inputName)} // Registrar input en react-hook-form
            onChange={handleChange} // Manejar cambios
            className='input input-bordered bg-secondary dark:bg-secondary-dark border-1 py-3 px-3 border-accent input-md w-full rounded-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent pr-10'
          />
          {/* Botón de mostrar/ocultar contraseña */}
          {/* <div className='absolute inset-y-0 right-0 flex items-center px-3'>
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='bg-transparent border-none cursor-pointer'
            >
              {isPasswordVisible ? (
                <EyeSlashIcon className='w-5 h-5 text-text dark:text-text-dark' />
              ) : (
                <EyeIcon className='w-5 h-5 text-text dark:text-text-dark' />
              )}
            </button>
          </div> */}
        </div>

        {/* Botón de recargar */}
        {/* {!hideButton && (
          <div className=''>
            <button
              className='btn bg-primary hover:bg-primary-hover rounded'
              type='button'
              onClick={onButtonClick}
            >
              {buttonText ? (
                buttonText
              ) : (
                <ArrowPathIcon className='w-5 h-5 text-white' />
              )}
            </button>
          </div>
        )} */}

        {/* Botón de copiar al portapapeles */}
        {/* <div className=''>
          <button
            className='btn bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700/70 rounded'
            type='button'
            onClick={() => navigator.clipboard.writeText(password)}
          >
            <ClipboardIcon className='w-5 h-5 text-gray-600 dark:text-gray-400' />
          </button>
        </div> */}
      </div>

      {inputError && (
        <p className='mt-1 text-[14px] text-red-500 dark:text-red-400'>
          {inputError.message}
        </p>
      )}
    </div>
  )
}

export default PasswordTextField
