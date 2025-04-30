import { cva } from 'class-variance-authority'
import { ReactNode } from 'react'

interface BadgeProps {
  variant?:
    | 'default'
    | 'dark'
    | 'success'
    | 'warning'
    | 'danger'
    | 'white'
    | 'gray'
    | 'gray-lite'
    | 'primary'
    | 'orange'
    | 'indigo'
  children: string | ReactNode
  className?: string
  handleClick?: () => void
  disabled?: boolean
}

const Badge = ({
  children,
  variant,
  className,
  handleClick,
  disabled = false
}: BadgeProps) => {
  return (
    <p
      className={badgeVariants({ variant, className })}
      onClick={handleClick}
      style={{
        pointerEvents: disabled ? 'none' : 'auto'
      }}
    >
      {children}
    </p>
  )
}

export default Badge

const badgeVariants = cva(
  'flex items-center justify-center px-2 py-1 rounded-full border-2 font-semibold text-xs',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white border-primary',
        default:
          'bg-blue-400 dark:bg-blue-800 text-white border-blue-400 dark:border-blue-800 dark:text-gray-200',
        dark: 'bg-black text-white border-black',
        success:
          'bg-green-400 text-white border-green-400 dark:bg-green-700 dark:border-green-700 dark:text-gray-200',
        warning:
          'bg-orange-400 text-white border-orange-400 dark:bg-orange-700 dark:border-orange-700 dark:text-gray-200',
        danger:
          'bg-red-400 text-white border-red-400 dark:bg-red-600 dark:border-red-600 dark:text-gray-200',
        gray: 'bg-gray-400 text-white border-gray-400',
        'gray-lite': 'bg-gray-100 text-black border-gray-100',
        white: 'bg-white text-black border-white border',
        orange:
          'bg-[#fac565] text-white border-[#fac565] dark:bg-[#f1820f] dark:border-[#f1820f] dark:text-gray-100',
        indigo:
          'bg-indigo-400 text-white border-indigo-400 dark:bg-indigo-900 dark:text-gray-200 dark:border-indigo-900'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
