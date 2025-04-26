import React from 'react'
import { useFormContext } from 'react-hook-form'

interface RadioButtonYesNoProps {
  label?: string
  options: string[]
  inputName: string
  disabled?: boolean
  color1?: string
  color2?: string
}

const RadioButtonYesNo: React.FC<RadioButtonYesNoProps> = ({
  label = '',
  inputName,
  options,
  disabled = false,
  color1 = 'bg-green-500 dark:bg-green-700',
  color2 = 'bg-red-500 dark:bg-red-700'
}) => {
  const { register, watch, setValue } = useFormContext()
  // const value = watch(inputName, 1)
  const value = watch(inputName)

  const handleClick = (newValue: number) => {
    if (!disabled) {
      setValue(inputName, newValue)
    }
  }

  return (
    <div className='w-full flex flex-col gap-1'>
      <label className='font-semibold text-text dark:text-text-dark'>{label}</label>
      <div className='flex rounded-md overflow-hidden bg-secondary dark:bg-secondary-dark border border-accent shadow-sm'>
        <button
          type='button'
          className={`flex-1 py-3 px-5 text-center cursor-pointer transition-all 
            ${value === 1 ? color1 + ' text-white' : 'bg-secondary dark:bg-secondary-dark text-text dark:text-text-dark'}
            border-r border-accent`}
          onClick={() => handleClick(1)}
        >
          {options[0]}
        </button>
        <button
          type='button'
          className={`flex-1 py-3 px-5 text-center cursor-pointer transition-all 
            ${value === 0 ? color2 + ' text-white' : 'bg-secondary dark:bg-secondary-dark text-text dark:text-text-dark'}`}
          onClick={() => handleClick(0)}
        >
          {options[1]}
        </button>
      </div>
      <input type='hidden' {...register(inputName)} value={value} />
    </div>
  )
}

export default RadioButtonYesNo
