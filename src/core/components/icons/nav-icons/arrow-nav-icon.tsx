import { SVGProps } from 'react'
import { useTheme } from '../../ui/context/theme-context'

interface ArrowNavIconProps extends SVGProps<SVGSVGElement> {
  collapsed?: boolean
}

const ArrowNavIcon = ({ collapsed, ...props }: ArrowNavIconProps) => {
  const { theme } = useTheme()

  return (
    <svg
      className={collapsed ? 'rotate-180 transition-transform' : ''}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      {...props}
    >
      <path
        fill='none'
        stroke={theme === 'dark' ? 'white' : 'black'}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M7 6v12M18 6l-6 6l6 6'
      ></path>
    </svg>
  )
}

export default ArrowNavIcon
