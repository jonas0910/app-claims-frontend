import { InputHTMLAttributes } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

interface RUCFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputName: string;
  inputError?: FieldError;
}

const RUCField = ({
  inputName,
  label,
  className,
  inputError,
  ...props
}: RUCFieldProps) => {
  const { register } = useFormContext();

  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={inputName} className="font-semibold text-gray-600 dark:text-base-content">
        {label}
      </label>
      <div className="flex items-stretch">
        <input
          id={inputName}
          {...props}
          {...register(inputName)}
          className={`input w-full input-bordered input-md focus:outline-none rounded ${className} dark:placeholder:text-gray-600`}
          pattern="^\d{11}$"
          inputMode="numeric"
          maxLength={11}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
          }}
          title="Ingrese un RUC valido"
        />
      </div>
      {inputError && (
        <p className="mt-1 text-[14px] text-red-500 dark:text-red-400">
          {inputError.message}
        </p>
      )}
    </div>
  );
};

export default RUCField;
