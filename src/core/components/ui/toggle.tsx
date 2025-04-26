import { useFormContext } from 'react-hook-form'

interface ToggleProps {
  inputName: string
  label: string
  handleOnChange?: () => void
}

const Toggle = ({ inputName, label, handleOnChange }: ToggleProps) => {
  const { register } = useFormContext()
  //   const isChecked = getValues(inputName)

  return (
    <label className='flex flex-col items-center gap-1 cursor-pointer'>
      <span className='font-semibold text-gray-600 dark:text-gray-300'>
        {label}
      </span>
      <input
        type='checkbox'
        // {...register(inputName, { setValueAs: (value) => (value ? 1 : 0) })}
        // checked={isChecked === 1}
        // onChange={(e) => setValue(inputName, e.target.checked ? 1 : 0)}
        {...register(inputName, {
          onChange: handleOnChange ? handleOnChange : () => {}
        })}
        // checked={isChecked}
        // onChange={(e) => setValue(inputName, e.target.checked)}
        className='sr-only peer'
      />
      <div className="relative w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  )
}

export default Toggle
