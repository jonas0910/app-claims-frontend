import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputName: string;
}

const TextFieldrow = ({
  label,
  inputName,
  className,
  ...props
}: TextFieldProps) => {
  const { register } = useFormContext();

  return (
    <div className="w-full flex flex-row items-center gap-2">
      <label htmlFor={inputName} className="font-semibold text-gray-600 dark:text-base-content">
        {label}
      </label>
      <input
        id={inputName}
        {...register(inputName)}
        {...props}
        className={`input input-bordered input-md w-full rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      />
    </div>
  );
};

export default TextFieldrow;
