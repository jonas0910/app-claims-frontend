import { CalendarIcon } from "@heroicons/react/24/solid";
import { InputHTMLAttributes, useRef } from "react";
import { FieldError, useFormContext } from "react-hook-form";

interface DateFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputName: string;
  inputError?: FieldError;
}
const DateField = ({ inputName, label, inputError, className, ...props }: DateFieldProps) => {
  const { register, setValue } = useFormContext(); // Agregamos setValue para actualizar el valor manualmente
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openDatePicker = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-1">
      <label htmlFor={inputName} className="font-semibold text-text dark:text-text-dark">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputName}
          type="date"
          {...register(inputName, {
            onChange: (e) => setValue(inputName, e.target.value), // Asegura que el valor se guarde
          })}
          ref={(el: HTMLInputElement | null) => (inputRef.current = el)}
          {...props}
          className={`border text-text dark:text-text-dark bg-secondary dark:bg-secondary-dark border-accent rounded-md px-3 py-3 focus:outline-none focus:ring-1 focus:ring-accent w-full ${className}`}
        />
        <button
          type="button"
          onClick={openDatePicker}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <CalendarIcon className="w-5 h-5 text-text dark:text-text-dark" />
        </button>
      </div>
      {inputError && <p className="mt-1 text-[14px] text-red-500 dark:text-red-400">{inputError.message}</p>}
    </div>
  );
};

export default DateField;
