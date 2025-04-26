'use client'

import { InputHTMLAttributes, useEffect, useState } from 'react'
import { FolderPlusIcon } from '@heroicons/react/20/solid'

// interface UploadFileProps extends React.InputHTMLAttributes<HTMLInputElement> {}

interface UploadFileProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string
  label: string
  inputName: string
  fileFormats?: string
  acceptFormats?: string
  handleSetImages?: (imgs: File[]) => void
  maxFiles?: number
  reset?: boolean
  // inputError?: Merge<FieldError, (FieldError | undefined)[]>
}

const FileUploadField = ({
  title,
  label,
  inputName,
  fileFormats = '',
  acceptFormats,
  handleSetImages,
  maxFiles = 10,
  reset,
  ...props
}: UploadFileProps) => {
  const [fileNames, setFileNames] = useState([] as string[])
  // const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    if (reset) setFileNames([])
  }, [reset])

  // MODIFICAR LA FUNCION PARA QUE ACEPTE MULTIPLES ARCHIVOS
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files?.[0]

    const selectedFiles = event.target.files
    const files = event.target.files // para los names

    if (files && files.length > 0) {
      const fileNames = Array.from(files).map((file) => file.name)
      setFileNames(fileNames)
    }

    if (
      selectedFiles &&
      selectedFiles.length > 0 &&
      selectedFiles.length <= maxFiles
    ) {
      const files = Array.from(selectedFiles)
      handleSetImages?.(files)
    }
  }

  return (
    <div className='flex flex-col gap-1'>
      <p className='font-semibold text-gray-600 dark:text-base-content'>
        {title}
      </p>
      <div className='flex items-center justify-center w-full'>
        <label
          htmlFor={inputName}
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
            fileNames.length > 0 && fileNames.length <= maxFiles
              ? 'bg-green-100 border-green-200'
              : 'bg-gray-50 dark:bg-gray-700 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/70'
          }`}
        >
          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
            <FolderPlusIcon className='w-8 h-8 text-gray-500' />
            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
              <span className='font-semibold'>{label}</span>
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              {fileFormats.toUpperCase()}
            </p>
            {fileNames.length > 0 && fileNames.length <= maxFiles ? ( // Mostrar el nombre del archivo si está seleccionado
              <p className='mt-2 text-xs text-green-600'>
                Archivo(s) seleccionado(s):{' '}
                {fileNames.length > 1
                  ? `${fileNames.length} archivos`
                  : fileNames[0]}
              </p>
            ) : (
              <p>
                {fileNames.length > maxFiles && (
                  <span className='text-red-500 text-xs'>
                    Solo se permite subir un maximo de {maxFiles} archivo(s)
                  </span>
                )}
              </p>
            )}
          </div>
          <input
            id={inputName}
            type='file'
            className='hidden'
            onChange={handleFileChange} // Agrega el manejador de eventos onChange
            accept={acceptFormats}
            {...props}
          />
        </label>
      </div>
    </div>
  )
}

export default FileUploadField
