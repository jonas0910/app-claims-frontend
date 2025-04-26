'use client'

import { ReactNode, useRef } from 'react'

interface SearchFieldProps {
  label: string
  inputName: string
  icon?: ReactNode
  captureValue?: (value: string) => void
}

const SearchField = ({
  label,
  inputName,
  icon,
  captureValue
}: SearchFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const search = () => {
    captureValue && captureValue(inputRef.current?.value ?? '')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className='w-full flex flex-col gap-1'>
      <label htmlFor={inputName} className='font-semibold text-text dark:text-text-dark'>
        {label}
      </label>
      <div className='flex'>
        <input
          type='text'
          ref={inputRef}
          id={inputName}
          placeholder='Buscar...'
          className='border text-text dark:text-text-dark bg-secondary dark:bg-secondary-dark border-accent rounded-md px-3 py-3 focus:outline-none focus:ring-1 focus:ring-accent w-full'
        />
        <button
          onClick={search}
          type='button'
          className='ml-2 px-4 py-3 rounded-md bg-primary text-white hover:bg-primary-hover transition'
        >
          {icon ? icon : 'Buscar'}
        </button>
      </div>
    </div>
  )
}

export default SearchField
