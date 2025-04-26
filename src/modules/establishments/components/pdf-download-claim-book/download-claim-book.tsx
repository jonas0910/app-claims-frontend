import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

import { useAuthSessionStore } from '@/core/store/auth/auth-session-store'
import { Badge } from '@/core/components/ui'
import { PdfIcon } from '@/core/components/icons'
import { BookOpenIcon } from '@heroicons/react/24/solid'
import { baseUrlClaim } from '../../helpers/custom-link'

interface DownloadClaimBookProps {
  custom_link: string
}

const DownloadClaimBook = ({custom_link}:DownloadClaimBookProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({
    contentRef
  })

  return (
    <div>
      <Badge
        className='cursor-pointer w-10 h-10 bg-green-400 border-green-400'
        handleClick={() => reactToPrintFn()}
      >
        <PdfIcon className='w-4 h-4' />
      </Badge>

      <div ref={contentRef} className='hidden print:block p-8'>
        {/* Cuadro con la figura del libro y el texto */}
        <div className='border-2 border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center w-full mx-auto'>
          {/* Imagen del libro (puedes usar un ícono o una imagen) */}
          <BookOpenIcon className='w-80 h-80 text-gray-600' />
          {/* Texto debajo */}
          <p className='text-center text-4xl font-semibold my-10'>
            Conforme a lo establecido en el Código de Protección y Defensa del
            Consumidor, este establecimiento cuenta con un libro de
            reclamaciones virtual a tu disposición. Solicítalo para registrar
            una queja o reclamo.
          </p>
          <p className='text-center text-xl font-semibold my-10'>
            El link del libro de reclamaciones virtual es: {custom_link}
          </p>
          <p className='text-center text-xl font-semibold my-10'>
            En caso de negativa de entrega del libro, escribe a
            libroreclamaciones@indecopi.gob.pe
          </p>
        </div>
      </div>
    </div>
  )
}

export default DownloadClaimBook
