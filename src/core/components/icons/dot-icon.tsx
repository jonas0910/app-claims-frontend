import React, { SVGProps } from 'react'

const DotIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' {...props}>
      <circle cx='16' cy='16' r='8' fill='currentColor' />
    </svg>
  )
}

export default DotIcon
