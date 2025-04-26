// import React, { useState, useEffect } from 'react'
// import { EyeIcon, EyeOffIcon } from '../icons'
// import { FieldError, useFormContext } from 'react-hook-form'

// interface ConfirmPasswordTextFieldProps {
//   label: string
//   inputName: string
//   password: string
//   confirmPassword: string
//   setConfirmPassword: (password: string) => void
//   placeholder: string
//   showPassword?: boolean
//   setShowPassword?: (show: boolean) => void
//   inputError?: FieldError | undefined
// }

// const ConfirmPasswordTextField = ({
//   label,
//   inputName,
//   password,
//   confirmPassword,
//   setConfirmPassword,
//   placeholder,
//   showPassword,
//   setShowPassword,
//   inputError
// }: ConfirmPasswordTextFieldProps) => {
//   const [isPasswordVisible, setIsPasswordVisible] = useState(showPassword || false)

//   // Accede a los métodos del formulario
//   const { setValue, clearErrors } = useFormContext()

//   useEffect(() => {
//     setIsPasswordVisible(showPassword || false)
//   }, [showPassword])

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible)
//     if (setShowPassword) setShowPassword(!isPasswordVisible)
//   }

//   const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newConfirmPassword = e.target.value
//     setConfirmPassword(newConfirmPassword) // Actualiza el estado local
//     setValue(inputName, newConfirmPassword) // Actualiza el valor en el formulario
//     clearErrors(inputName) // Limpia cualquier error asociado con este campo
//   }

//   return (
//     <div className='w-full flex flex-col gap-1'>
//       <label htmlFor={inputName} className='font-semibold text-gray-600 dark:text-base-content'>
//         {label}
//       </label>
//       <div className='relative flex items-center'>
//         <input
//           id={inputName}
//           type={isPasswordVisible ? 'text' : 'password'}
//           placeholder={placeholder}
//           value={confirmPassword}
//           onChange={handleConfirmPasswordChange}
//           className={`input input-bordered input-md w-full rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary`}
//         />
//         <button
//           className='absolute inset-y-0 right-0 flex items-center px-3'
//           type='button'
//           onClick={togglePasswordVisibility}
//         >
//           {isPasswordVisible ? (
//             <EyeOffIcon className='w-5 h-5 text-gray-600' />
//           ) : (
//             <EyeIcon className='w-5 h-5 text-gray-600' />
//           )}
//         </button>
//       </div>
//       {inputError && (
//         <p className='mt-1 text-[14px] text-red-500 dark:text-red-400'>
//           {inputError.message}
//         </p>
//       )}
//     </div>
//   )
// }

// export default ConfirmPasswordTextField
