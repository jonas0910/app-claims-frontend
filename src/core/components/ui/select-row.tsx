import { SelectHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  inputName: string;
  options: { value: string; label: string }[];
}

const SelectRow = ({ label, inputName, options, ...props }: SelectProps) => {
  const { register } = useFormContext();

  return (
    <div className='w-full flex flex-col gap-1'>
      <label htmlFor={inputName} className='font-semibold text-gray-600 dark:text-base-content'>
        {label}
      </label>
      <select
        className='select select-bordered w-full focus:outline-none'
        id={inputName}
        {...register(inputName)}
        {...props}
        defaultValue=''
      >
        <option disabled value=''>
          Seleccione:
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectRow;
