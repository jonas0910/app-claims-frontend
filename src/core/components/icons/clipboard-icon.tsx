import { SVGProps } from 'react'

const ClipboardIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M16 2H8c-1.1 0-2 .9-2 2v1H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-2V4c0-1.1-.9-2-2-2zM8 4h8v1H8V4zm12 18H4V8h3v1h10V8h3v14zm-7-9H9v2h4v-2z"
      />
    </svg>
  )
}

export default ClipboardIcon