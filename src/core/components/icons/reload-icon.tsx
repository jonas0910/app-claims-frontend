import { SVGProps } from 'react'

const ReloadIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M12.75 8a4.5 4.5 0 0 1-8.61 1.834l-1.391.565A6.001 6.001 0 0 0 14.25 8A6 6 0 0 0 3.5 4.334V2.5H2v4l.75.75h3.5v-1.5H4.352A4.5 4.5 0 0 1 12.75 8'
        clipRule='evenodd'
      />
    </svg>
  )
}

export default ReloadIcon
