"use client";
import { InputHTMLAttributes, useEffect } from "react";
import { FieldError, useFormContext } from "react-hook-form";

interface NumberFieldReadOnlyProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputName: string;
  symbol?: string;
  value: number | undefined;
  inputError?: FieldError;
  hidden?: boolean;
}

const NumberFieldReadOnly = ({
  inputName,
  label,
  symbol,
  className,
  value,
  inputError,
  hidden,
  ...props
}: NumberFieldReadOnlyProps) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue(inputName, value);
  }, [inputName, value, setValue]);

  return (
    <div className={`w-full ${hidden ? "hidden" : "flex"} flex-col gap-1`}>
      <label
        htmlFor={inputName}
        className="font-semibold text-gray-600 dark:text-base-content"
      >
        {label}
      </label>
      <div className="flex items-stretch">
        {symbol && (
          <div className="flex items-center justify-center px-2 border bg-gray-200 dark:bg-[#191E24] border-gray-300 dark:border-gray-600 rounded-tl rounded-bl">
            <p className="text-sm">{symbol}</p>
          </div>
        )}

        <input
          id={inputName}
          {...props}
          className={`input w-full input-bordered input-md bg-gray-100 dark:bg-[#2A323C] text-center font-semibold text-gray-600 dark:text-gray-400 focus:outline-none rounded ${
            symbol ? "rounded-tl-none rounded-bl-none" : ""
          } ${className}`}
          value={value ?? ""}
          onChange={() => {}}
          readOnly
          pattern="^\d*\.?\d*$" // Asegura que solo se acepten dígitos.
          inputMode="numeric" // Sugiere un teclado numérico en móviles
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(
              /[^0-9.]/g,
              ""
            );
          }}
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

export default NumberFieldReadOnly;
