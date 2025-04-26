import { SVGProps } from 'react'

export function CancelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <g fill='none' stroke='currentColor' strokeWidth='2'>
        <circle cx='12' cy='12' r='9' />
        <path d='M18 18L6 6' />
      </g>
    </svg>
  )
}
