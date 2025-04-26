import React, { SVGProps } from 'react'

const ArrowTopIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='m6 15l6-6l6 6'
      />
    </svg>
  )
}

export default ArrowTopIcon
