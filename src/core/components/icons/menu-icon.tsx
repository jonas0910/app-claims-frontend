import { SVGProps } from 'react'

const MenuIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <path fill='currentColor' d='M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z' />
    </svg>
  )
}

export default MenuIcon
