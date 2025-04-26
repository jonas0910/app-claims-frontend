import { FieldError, useFormContext } from 'react-hook-form'

interface RadioButtonGroupProps {
  inputName: string
  options: { value: number | string; label: string }[]
  inputError?: FieldError
}

const RadioButtonGroup = ({
  inputName,
  options,
  inputError
}: RadioButtonGroupProps) => {
  const { register } = useFormContext()

  return (
    <div className='flex flex-col items-center gap-3'>
      <div className='flex gap-20'>
        {options.map((option) => (
          <label key={option.value} className='flex items-center gap-1'>
            <input
              type='radio'
              className='radio-sm checked:bg-primary checked:border-transparent'
              value={option.value}
              {...register(inputName)}
            />
            <span className='ms-2 text-sm font-medium text-gray-900'>
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {inputError && (
        <p className='mt-1 text-[14px] text-red-500 dark:text-red-400'>
          {inputError.message}
        </p>
      )}
    </div>
  )
}

export default RadioButtonGroup
