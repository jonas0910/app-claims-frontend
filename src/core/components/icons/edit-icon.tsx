import React, { SVGProps } from 'react'

const EditIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' {...props}>
      <path
        fill='currentColor'
        d='m16.77 8l1.94-2a1 1 0 0 0 0-1.41l-3.34-3.3a1 1 0 0 0-1.41 0L12 3.23zM1 14.25V19h4.75l9.96-9.96l-4.75-4.75z'
      />
    </svg>
  )
}

export default EditIcon
