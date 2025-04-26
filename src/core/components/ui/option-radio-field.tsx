import { useFormContext } from 'react-hook-form'

interface OptionRadioFieldProps {
  //   label: string
  // options: string[] | { value: string; label: string }[]
  options: string[]
  inputName: string
  question: string
  onChange?: (value: string) => void
}

const OptionRadioField = ({
  options,
  question,
  inputName
}: OptionRadioFieldProps) => {
  // cambiar a este formato.
  // options={[
  //     { value: 'credit', label: 'Tarjeta de Crédito' },
  //     { value: 'paypal', label: 'PayPal' },
  //     { value: 'bank', label: 'Transferencia Bancaria' }
  // ]}

  const { register } = useFormContext()

  // const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (onChange) onChange(e.target.value)
  // }

  return (
    <div className='bg-slate-200 dark:bg-gray-800 flex justify-between items-center p-3 rounded'>
      <div>
        <p className='font-medium text-sm'>{question}</p>
      </div>
      <div className='flex gap-10'>
        {options.map((opt) => (
          <div key={opt} className='flex items-center gap-2'>
            <label htmlFor={opt} className='font-semibold'>
              {opt}
            </label>
            <input
              type='radio'
              id={opt}
              // name={inputName} // register with react-hook-form
              {...register(inputName)}
              value={opt}
              className='radio border-2 border-gray-400'
              // onChange={handleOptionChange}
              // defaultChecked={index === 0} // Marcar el primer radio por defecto
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OptionRadioField
