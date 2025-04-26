import { InputHTMLAttributes } from "react";
import { FieldError, useFormContext } from "react-hook-form";

interface EmailFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputName: string;
  inputError?: FieldError;
}

const EmailField = ({
  inputName,
  label,
  className,
  inputError,
  ...props
}: EmailFieldProps) => {
  const { register } = useFormContext();

  return (
    <div className="w-full flex flex-col gap-1">
      <label
        htmlFor={inputName}
        className="font-semibold text-text dark:text-text-dark"
      >
        {label}
      </label>
      <input
        id={inputName}
        type="email" // Establece el tipo de entrada como email
        {...props}
        {...register(inputName)}
        className={`input bg-secondary dark:bg-secondary-dark border-1 border-accent p-3 input-bordered input-md dark:placeholder:text-gray-600 w-full rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent ${className}`}
        // required // Marca el campo como requerido
        // pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' // Patrón para validar correos electrónicos
        onInput={(e) => {
          // Opcional: agregar lógica para limpiar el campo si es necesario
          const value = e.currentTarget.value;
          if (!/^[a-zA-Z0-9._%+-]*$/.test(value)) {
            e.currentTarget.value = value.replace(/[^a-zA-Z0-9._%+-@]/g, "");
          }
        }}
      />
      {inputError && (
        <p className="mt-1 text-[14px] text-red-500 dark:text-red-400">
          {inputError.message}
        </p>
      )}
    </div>
  );
};

export default EmailField;
