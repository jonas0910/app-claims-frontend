
import { useFormContext } from 'react-hook-form'

interface RadioButtonYesNoProps {
  label?: string
  options: string[]
  inputName: string
  disabled?: boolean
}

const ButtonSelectOption = ({
  label = '',
  inputName,
  options
}: RadioButtonYesNoProps) => {
  const { register, watch, setValue } = useFormContext()
  const value = watch(inputName)

  const handleClick = (newValue: number) => {
    setValue(inputName, newValue)
  }

  return (
    <div className='w-full flex flex-col gap-1'>
      <label className='font-normal'>{label}</label>
      <div className='flex rounded-lg overflow-hidden bg-gray-200 shadow-md shadow-black-300 border'>
        <button
          type='button'
          className={`flex-1 py-3 px-5 text-center cursor-pointer ${value === 1 ? 'bg-green-500 text-white' : 'bg-white text-black'}`}
          onClick={() => handleClick(1)}
        >
          {options[0]}
        </button>
        <button
          type='button'
          className={`flex-1 py-3 px-5 text-center cursor-pointer ${value === 0 ? 'bg-red-500 text-white' : 'bg-white text-black'}`}
          onClick={() => handleClick(0)}
        >
          {options[1]}
        </button>
      </div>
      <input
        type='hidden'
        {...register(inputName)}
        // value={value}
      />
    </div>
  )
}

export default ButtonSelectOption
