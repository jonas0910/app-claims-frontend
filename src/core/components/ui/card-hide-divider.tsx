import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  title?: string
  className?: string
}

const CardHideDivider = ({ children, title, className }: CardProps) => {
  return (
    <div className={`card bg-white dark:bg-base-100 shadow-lg rounded-md p-5 ${className}`}>
      {title && (
        <h2
          // style={{ textShadow: '3px 0px 10px #000004' }}
          className='text-xl pl-1 pb-2 font-semibold text-gray-700 dark:text-gray-200 text-center uppercase'
        >
          {title}
        </h2>
      )}
      <div className='p-5'>{children}</div>
    </div>
  )
}

export default CardHideDivider
