interface SelectReadOnlyProps {
  //   inputName: string
  // value tiene que ser number
  placeholder?: string
  options: { value: string | number; label: string }[]
}

const SelectReadOnly = ({
  options,
  placeholder = 'Lista'
}: SelectReadOnlyProps) => {
  return (
    <div className='w-full flex flex-col gap-1'>
      <select
        className='select select-bordered w-full focus:outline-none'
        // id={inputName}
        defaultValue=''
      >
        <option disabled value=''>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectReadOnly
