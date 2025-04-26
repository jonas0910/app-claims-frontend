import React, { SVGProps } from 'react'

const ClickIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' {...props}>
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='4'
      >
        <path d='M24 4v8' />
        <path d='m22 22l20 4l-6 4l6 6l-6 6l-6-6l-4 6z' clipRule='evenodd' />
        <path d='m38.142 9.858l-5.657 5.657M9.858 38.142l5.657-5.657M4 24h8M9.858 9.858l5.657 5.657' />
      </g>
    </svg>
  )
}

export default ClickIcon
