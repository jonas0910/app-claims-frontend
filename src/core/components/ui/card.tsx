import { ReactNode } from 'react'
interface CardProps {
  children: ReactNode
  title?: string
  className?: string
  extra?: ReactNode
}

const Card = ({ children, title, className, extra }: CardProps) => {
  return (
    <div
      className={`card bg-background-alt dark:bg-background-dark-alt shadow-lg rounded-md p-5 ${className}`}
    >
      <div className='flex flex-row justify-between items-center'>
        {title && (
          <h2
            className={`text-xl pl-1 pb-2 border-b-2 border-gray-200 dark:border-gray-700 font-semibold uppercase text-gray-700 dark:text-gray-200`}
          >
            {title}
          </h2>
        )}
        {extra}
      </div>
      <div className='p-5'>{children}</div>
    </div>
  )
}

export default Card

// className='text-xl pl-1 pb-2 font-semibold text-gray-700 text-center uppercase'
