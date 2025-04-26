import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cva } from 'class-variance-authority'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'primaryMD'
    | 'primaryLG'
    | 'secondary'
    | 'secondaryMD'
    | 'downloadExcel'
    | 'downloadPdf'
    | 'downloadXml'
    | 'downloadCrd'
  children: string | ReactNode
  icon?: ReactNode
}

const Button = ({ children, variant, icon, ...props }: ButtonProps) => {
  return (
    <button className={buttonVariants({ variant })} {...props}>
      {icon && <span>{icon}</span>}
      <span className='w-full text-center'>{children}</span>
    </button>
  )
}

export default Button

const buttonVariants = cva(
  'py-1 px-5 rounded-md border-2 flex items-center gap-2 text-sm',
  {
    variants: {
      variant: {
        primary:
          'bg-primary hover:bg-primary-hover text-white border-primary hover:border-primary-hover disabled:bg-primary-hover disabled:text-gray-100',
        primaryMD:
          'py-2 rounded bg-primary hover:bg-primary-hover text-white border-primary hover:border-primary-hover disabled:bg-primary-hover disabled:text-gray-100',
        primaryLG:
          'py-3 rounded bg-primary hover:bg-primary-hover text-white border-primary hover:border-primary-hover disabled:bg-primary-hover disabled:text-gray-100',
        secondary:
          'bg-transparent hover:bg-white dark:hover:bg-transparent text-primary hover:text-primary-hover border-primary hover:border-primary-hover',
        secondaryMD:
          'py-2 rounded bg-transparent hover:bg-white dark:hover:bg-transparent  text-primary hover:text-primary-hover border-primary hover:border-primary-hover',
        downloadExcel:
          'py-2 font-bold bg-lime-600 dark:bg-lime-700 dark:border-gray-700 hover:opacity-75 text-white hover:text-white dark:text-gray-200',
        downloadPdf:
          'py-2 font-bold bg-red-600 dark:bg-red-700 dark:border-gray-700 hover:opacity-75 text-white hover:text-white dark:text-gray-200',
        downloadXml:
          'py-2 font-bold bg-primary hover:opacity-75 text-white hover:text-white',
        downloadCrd:
          'py-2 font-bold bg-orange-600 hover:opacity-75 text-white hover:text-white'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)
