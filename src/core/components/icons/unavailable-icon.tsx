import React, { SVGProps } from 'react'

const UnavailableIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <path
        fill='currentColor'
        d='M12 19.75A7.75 7.75 0 0 1 4.25 12h-2.5c0 5.66 4.59 10.25 10.25 10.25zm0-15.5A7.75 7.75 0 0 1 19.75 12h2.5c0-5.661-4.59-10.25-10.25-10.25zM4.25 12c0-2.14.866-4.076 2.27-5.48L4.752 4.752A10.22 10.22 0 0 0 1.75 12zm2.27-5.48A7.72 7.72 0 0 1 12 4.25v-2.5c-2.83 0-5.394 1.149-7.248 3.002zm-1.768 0L17.48 19.248l1.768-1.768L6.52 4.752zM19.75 12c0 2.14-.866 4.076-2.27 5.48l1.768 1.768A10.22 10.22 0 0 0 22.25 12zm-2.27 5.48A7.72 7.72 0 0 1 12 19.75v2.5c2.83 0 5.394-1.149 7.248-3.002z'
      />
    </svg>
  )
}

export default UnavailableIcon
