// import { UploadFileIcon } from '@/core/components/icons';
// import { useState, useEffect } from 'react';
// import { useFormContext } from 'react-hook-form';

// interface LogoUploadProps {
//   title: string;
//   label: string;
//   inputName: string;
//   acceptFormats?: string;
//   initialPreview?: string;
// }

// const LogoUploadInput = ({
//   title,
//   label,
//   inputName,
//   acceptFormats = 'image/*',
//   initialPreview = '',
// }: LogoUploadProps) => {
//   const [preview, setPreview] = useState<string | null>(initialPreview);
//   const { register, setValue } = useFormContext();

//   useEffect(() => {
//     if (initialPreview && preview !== initialPreview) {
//       setPreview(initialPreview);
//     }
//   }, [initialPreview, preview]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result as string;
//         setPreview(base64String); // Actualizar la vista previa con la imagen base64
//         setValue(inputName, base64String); // Guardar base64 en el formulario
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
//       <div className="flex items-center gap-4">
//         {preview ? (
//           // eslint-disable-next-line @next/next/no-img-element
//           <img
//             src={preview}
//             alt="Vista previa del logo"
//             className="w-16 h-16 object-contain border rounded-lg"
//           />
//         ) : (
//           <div className="flex items-center justify-center w-16 h-16 border rounded-lg bg-gray-50">
//             <UploadFileIcon className="w-8 h-8 text-gray-500" />
//           </div>
//         )}
//         <div className="flex flex-col">
//           <p className="font-semibold">{title}</p>
//           <p className="text-sm text-gray-500">{label}</p>
//         </div>
//         <div className="ml-auto">
//           <label
//             htmlFor={inputName}
//             className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg cursor-pointer hover:bg-green-600"
//           >
//             Subir logo
//             <input
//               id={inputName}
//               type="file"
//               className="hidden"
//               accept={acceptFormats}
//               {...register(inputName, { onChange: handleFileChange })}
//             />
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogoUploadInput;

'use client'

import { UploadFileIcon } from '@/core/components/icons'
import { register } from 'module'
import { useEffect, useState } from 'react' // Asegúrate de tener este icono importado
import { useFormContext } from 'react-hook-form'

interface LogoUploadInputProps {
  title: string
  label: string
  inputName: string
  acceptFormats?: string
  initialPreview?: string | null
}

const LogoUploadInput = ({
  title,
  label,
  inputName,
  acceptFormats = 'image/*', // Por defecto acepta cualquier tipo de imagen
  initialPreview = '' // Por defecto no tiene una vista previa
}: LogoUploadInputProps) => {
  const [preview, setPreview] = useState<string | null>(initialPreview)
  const { register } = useFormContext()

  // useEffect(() => {
  //     setPreview(initialPreview)
  // }, [initialPreview, preview])
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='flex flex-col gap-4 p-4 border rounded-lg shadow-sm'>
      <div className='flex items-center gap-4'>
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt='Vista previa del logo'
            className='w-16 h-16 object-contain border rounded-lg'
          />
        ) : (
          <div className='flex items-center justify-center w-16 h-16 border rounded-lg bg-gray-50'>
            <UploadFileIcon className='w-8 h-8 text-gray-500' />
          </div>
        )}
        <div className='flex flex-col'>
          <p className='font-semibold'>{title}</p>
          <p className='text-sm text-gray-500'>{label}</p>
        </div>
        <div className='ml-auto'>
          <label
            htmlFor={inputName}
            className='px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg cursor-pointer hover:bg-green-600'
          >
            Subir logo
            <input
              id={inputName}
              type='file'
              className='hidden'
              accept={acceptFormats}
              {...register(inputName, { onChange: handleFileChange })}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default LogoUploadInput
