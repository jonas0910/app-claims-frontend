import { InputHTMLAttributes } from "react";
import { FieldError, useFormContext } from "react-hook-form";

interface NumberFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputName: string;
  symbol?: string;
  inputError?: FieldError;
  onChange?: () => void;
}

const NumberFieldOnchange = ({
  inputName,
  label,
  symbol,
  className,
  inputError,
  onChange,
  ...props
}: NumberFieldProps) => {
  const { register, setValue } = useFormContext();

  return (
    <div className="w-full flex flex-col gap-1">
      <label
        htmlFor={inputName}
        className="font-semibold text-gray-600 dark:text-base-content"
      >
        {label}
      </label>
      <div className="flex items-stretch">
        {symbol && (
          <div className="flex items-center justify-center bg-gray-200 dark:bg-[#191E24] border-gray-300 dark:border-gray-600 px-2 border rounded-tl rounded-bl">
            <p className="text-sm">{symbol}</p>
          </div>
        )}

        <input
          type="number"
          id={inputName}
          //   {...(register(inputName),
          //   {
          //     onChange: (e) => {
          //       setValue(inputName, parseFloat(e.target.value))
          //       onChange && onChange()
          //     }
          //   })}
          {...register(inputName, {
            onChange: (e) => {
              const value = e.target.value;

              // Validar si el valor es un número o un punto
              if (/^\d*\.?\d*$/.test(value)) {
                setValue(inputName, value);
              } else {
                // e.target.value = '' // Limpiar el campo en caso de valor no válido
              }
              onChange && onChange();
            },
          })}
          {...props}
          className={`input w-full input-bordered input-md dark:placeholder:text-gray-600 focus:outline-none rounded ${
            symbol ? "rounded-tl-none rounded-bl-none" : ""
          } ${className}`}
          pattern="^\d*\.?\d*$"
          inputMode="numeric"
          step="0.01"
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

export default NumberFieldOnchange;
