import { FieldError, useFormContext } from 'react-hook-form'

interface OptionRadioFieldMultipleProps {
  options: { value: number | string; label: string }[] | undefined
  inputName: string
  question: string
  reset?: () => void
  inputError?: FieldError
}

const OptionRadioFieldMultiple = ({
  inputName,
  options,
  question,
  reset,
  inputError
}: OptionRadioFieldMultipleProps) => {
  const { setValue, watch } = useFormContext()

  const selectedOption = watch(inputName)
  const handleChange = (value: string | number) => {
    setValue(inputName, value)

    if (reset) {
      reset()
    }
  }

  return (
    <div className='bg-slate-200 dark:bg-gray-800 flex justify-between items-center p-3 rounded'>
      <div>
        <p className='font-medium text-sm'>{question}</p>
      </div>
      <div className='flex gap-10'>
        {options?.map((opt) => (
          <div key={opt.label} className='flex items-center gap-2'>
            <label htmlFor={opt.label} className='font-semibold'>
              {opt.label}
            </label>
            <input
              type='radio'
              id={opt.label}
              // {...register(inputName)}
              value={opt.value}
              checked={selectedOption === opt.value}
              onChange={() => handleChange(opt.value)}
              className='radio border-2 border-gray-400'
            />
          </div>
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

export default OptionRadioFieldMultiple
