import React, { SVGProps } from 'react'

const SendIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      >
        <path
          strokeDasharray='20'
          strokeDashoffset='20'
          d='M12 15h2v-6h2.5l-4.5 -4.5M12 15h-2v-6h-2.5l4.5 -4.5'
        >
          <animate
            attributeName='d'
            begin='0.5s'
            dur='1.5s'
            repeatCount='indefinite'
            values='M12 15h2v-6h2.5l-4.5 -4.5M12 15h-2v-6h-2.5l4.5 -4.5;M12 15h2v-3h2.5l-4.5 -4.5M12 15h-2v-3h-2.5l4.5 -4.5;M12 15h2v-6h2.5l-4.5 -4.5M12 15h-2v-6h-2.5l4.5 -4.5'
          />
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            dur='0.4s'
            values='20;0'
          />
        </path>
        <path strokeDasharray='14' strokeDashoffset='14' d='M6 19h12'>
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            begin='0.5s'
            dur='0.2s'
            values='14;0'
          />
        </path>
      </g>
    </svg>
  )
}

export default SendIcon
