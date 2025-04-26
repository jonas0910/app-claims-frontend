'use client'
import { useState } from 'react'
import { useFormContext, FieldError } from 'react-hook-form'

interface DiscountFieldProps {
  inputName: string
  label: string
  className?: string
  inputError?: FieldError
  onDiscountTypeChange?: (isPercentage: boolean) => void
  symbol?: string
}

const DiscountField = ({
  inputName,
  label,
  className,
  inputError,
  onDiscountTypeChange,
  symbol = 'S/'
}: DiscountFieldProps) => {
  const { register, setValue } = useFormContext()
  const [isPercentage, setIsPercentage] = useState(false)

  // Cambia entre porcentaje y dinero
  const toggleDiscountType = () => {
    setIsPercentage(!isPercentage)
    setValue(inputName, '') // Resetea el campo al cambiar entre porcentaje y dinero
    if (onDiscountTypeChange) {
      onDiscountTypeChange(isPercentage)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    if (isPercentage) {
      // Permitir solo valores entre 0 y 100 con decimales
      if (value !== '' && (Number(value) < 0 || Number(value) > 100)) {
        return
      }
    }

    // Remover caracteres no numéricos, permitiendo decimales
    value = value.replace(/[^0-9.]/g, '')

    // Asegurarse de que no haya más de un punto decimal
    const parts = value.split('.')
    if (parts.length > 2) {
      return
    }

    setValue(inputName, value) // Actualiza el valor del campo
  }

  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      <div className='flex items-center'>
        <input
          type='checkbox'
          id={`${inputName}-checkbox`}
          className='mr-2' // Ajusta el espacio aquí entre checkbox y label/input
          checked={isPercentage}
          onChange={toggleDiscountType}
        />
        <label htmlFor={`${inputName}-checkbox`} className='font-semibold text-gray-600 dark:text-base-content'>
          {label}
        </label>
      </div>

      <div className='flex items-stretch mt-0'>
        {/* Contenedor de símbolo con ancho fijo */}
        <div className='flex items-center justify-center w-12 px-2 border bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-tl rounded-bl'>
          <p className='font-bold'>
            {isPercentage ? '%' : symbol}
          </p>
        </div>

        {/* Campo de texto */}
        <input
          id={inputName}
          {...register(inputName)}
          className={`input w-full input-bordered input-md focus:outline-none rounded ${
            isPercentage ? 'rounded-tl-none rounded-bl-none' : ''
          }`}
          pattern={
            isPercentage
              ? '^(100([.]0{1,2})?|[0-9]{1,2}([.][0-9]{1,2})?)$'
              : '^d*.?d*$'
          } // Validación: 0-100 para porcentaje
          inputMode='decimal' // Teclado numérico con punto decimal
          placeholder={isPercentage ? '0.00' : 'Escriba el monto'}
          onInput={handleInputChange}
        />
      </div>
      {inputError && (
        <p className='mt-1 text-[14px] text-red-500 dark:text-red-400'>
          {inputError.message}
        </p>
      )}
    </div>
  )
}

export default DiscountField
// 'use client';
// import { useState } from 'react';
// import { useFormContext } from 'react-hook-form';

// interface DiscountFieldProps {
//   inputName: string;
//   label: string;
//   className?: string;
// }

// const DiscountField = ({ inputName, label, className }: DiscountFieldProps) => {
//   const { register, setValue } = useFormContext();
//   const [isPercentage, setIsPercentage] = useState(false);

//   // Cambia entre porcentaje y dinero
//   const toggleDiscountType = () => {
//     setIsPercentage(!isPercentage);
//     setValue(inputName, ""); // Resetea el campo al cambiar entre porcentaje y dinero
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let value = e.target.value;

//     if (isPercentage) {
//       // Permitir solo valores entre 0 y 100 con decimales
//       if (value !== "" && (Number(value) < 0 || Number(value) > 100)) {
//         return;
//       }
//     }

//     // Remover caracteres no numéricos, permitiendo decimales
//     value = value.replace(/[^0-9.]/g, '');

//     // Asegurarse de que no haya más de un punto decimal
//     const parts = value.split('.');
//     if (parts.length > 2) {
//       return;
//     }

//     setValue(inputName, value); // Actualiza el valor del campo
//   };

//   return (
//     <div className={`w-full flex flex-col gap-1 ${className}`}>
//       <div className="flex items-center">
//         <input
//           type="checkbox"
//           id={`${inputName}-checkbox`}
//           className="mr-2" // Ajusta el espacio aquí entre checkbox y label/input
//           checked={isPercentage}
//           onChange={toggleDiscountType}
//         />
//         <label htmlFor={`${inputName}-checkbox`} className="font-semibold">
//           {label}
//         </label>
//       </div>

//       <div className="flex items-stretch mt-0">
//         {/* Contenedor de símbolo con ancho fijo */}
//         <div className="flex items-center justify-center w-12 px-2 border bg-gray-200 border-gray-300 rounded-tl rounded-bl">
//           <p className="text-gray-600 font-bold">{isPercentage ? '%' : 'S/'}</p>
//         </div>

//         {/* Campo de texto */}
//         <input
//           id={inputName}
//           {...register(inputName, {
//             pattern: isPercentage
//               ? /^(100(\.0{1,2})?|[0-9]{1,2}(\.[0-9]{1,2})?)$/
//               : /^\d*\.?\d*$/,
//           })}
//           className={`input w-full input-bordered input-md bg-white text-gray-600 focus:outline-none rounded ${
//             isPercentage ? 'rounded-tl-none rounded-bl-none' : ''
//           }`}
//           inputMode="decimal" // Teclado numérico con punto decimal
//           placeholder={isPercentage ? "0.00" : "Escriba el monto"}
//           onChange={handleInputChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default DiscountField
