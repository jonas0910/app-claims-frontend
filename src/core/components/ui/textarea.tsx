import { TextareaHTMLAttributes } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  inputName: string
  inputError?: FieldError
  className?: string
}

const Textarea = ({
  label,
  inputName,
  inputError,
  className,
  ...props
}: TextareaProps) => {
  const { register } = useFormContext()

  return (
    <div className='flex flex-col gap-1'>
      <label
        htmlFor={inputName}
        className='font-semibold text-gray-600 dark:text-base-content'
      >
        {label}
      </label>
      <textarea
        id={inputName}
        {...register(inputName)}
        className={`textarea textarea-bordered w-full max-h-32 dark:placeholder:text-gray-600 focus:outline-none ${
          className
        } rounded border focus:border-transparent focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600`}
        {...props}
      ></textarea>
      {inputError && (
        <p className='mt-1 text-[14px] text-red-500 dark:text-red-400'>
          {inputError.message}
        </p>
      )}
    </div>
  )
}

export default Textarea
