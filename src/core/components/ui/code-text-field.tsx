'use client'

import { useEffect, useState } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'
// import { useTheme } from './context/theme-context'

import {
  HandRaisedIcon ,
  LockClosedIcon,
  PencilIcon,
} from '@heroicons/react/20/solid'

enum CodeLength {
  SEVEN = 7,
  NINE = 9,
  ELEVEN = 11
}

interface CodeTextFieldProps {
  label: string
  inputName: string
  inputError?: FieldError
  codeLength?: CodeLength
  isResetCode?: boolean
  tag?: string
  defaultValue?: string
  // keyValue?: string

  className?: string // QUITAR
  code?: string // QUITAR
  generateCode?: () => void // QUITAR
  isDisabled?: boolean
}

const CodeTextField = ({
  label,
  inputName,
  inputError,
  codeLength = CodeLength.SEVEN,
  isResetCode, // Valor por defecto es 7
  tag,
  defaultValue,
  // keyValue,

  // code,
  // generateCode,
  // className,
  isDisabled,
  ...props
}: CodeTextFieldProps) => {

  const [isActive, setIsActive] = useState(false)
  const [codeGenerated, setCodeGenerated] = useState('')

  const { register, setValue, clearErrors } = useFormContext()

  useEffect(() => {
    if (!Boolean(codeGenerated)) return

    setValue(inputName, codeGenerated)
    clearErrors(inputName)
  }, [codeGenerated, inputName, setValue, clearErrors])


  useEffect(() => {
    if (isResetCode) {
      setCodeGenerated('')
    }
  }, [isResetCode])

  useEffect(() => {
    if (defaultValue) {
      setCodeGenerated(defaultValue)
    }
  }, [defaultValue])

  // const { theme } = useTheme()

  return (
    <div className='w-full flex flex-col gap-1'>
      <label
        htmlFor={inputName}
        className={`font-semibold text-gray-600 dark:text-base-content`}
      >
        {label}
      </label>
      <div className='flex'>
        <input
          id={inputName}
          placeholder={isActive ? 'Escribe tu codigo' : 'Genere un codigo'}
          // key={keyValue ? keyValue : undefined}
          // {...register(inputName)}
          // {...(register(inputName), { value: code, onChange: () => {} })}

          {...(register(inputName),
          {
            value: codeGenerated,
            onChange: (val) => {
              setCodeGenerated(val.target.value.toUpperCase())
            }
          })}
          {...props}
          className={`input input-bordered input-md dark:placeholder:text-gray-600 ${
            isActive
              ? 'focus:bg-white dark:focus:bg-[#2A323C]'
              : 'bg-gray-100 dark:bg-[#2A323C]'
          }  tracking-wider font-semibold w-full rounded focus:outline-none `}
          readOnly={!isActive}
        />
        <button
          className='btn bg-primary hover:bg-primary-hover rounded'
          type='button'
          // onClick={generateCode}
          onClick={() =>
            setCodeGenerated(
              tag
                ? `${tag}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
                : Math.random()
                    .toString(36)
                    .substring(2, 2 + codeLength)
                    .toUpperCase()
              // Math.random()
              //   .toString(36)
              //   .substring(2, 2 + codeLength)
              //   .toUpperCase()
            )
          }
          disabled={isDisabled}
        >
          <HandRaisedIcon className='w-5 h-5 text-white' />
        </button>
        <button
          type='button'
          onClick={() => setIsActive(!isActive)}
          className='btn bg-primary hover:bg-primary-hover rounded'
          disabled={isDisabled}
        >
          {isActive ? (
            <PencilIcon className='w-5 h-5 text-white' />
          ) : (
            <LockClosedIcon className='w-5 h-5 text-white' />
          )}
        </button>
      </div>
      {inputError && (
        <p className='mt-1 text-[14px] text-red-500 dark:text-red-400'>
          {inputError.message}
        </p>
      )}
    </div>
  )
}

export default CodeTextField
