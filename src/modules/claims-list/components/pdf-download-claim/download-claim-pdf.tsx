import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button } from '@/core/components/ui'
import { PdfIcon } from '@/core/components/icons'
import dayjs from 'dayjs'
import { ClaimGet } from '../../types/claim'

interface DownloadClaimPDFProps {
  claim: ClaimGet | null
}

const DownloadClaimPDF = ({ claim }: DownloadClaimPDFProps) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const reactToPrintFn = useReactToPrint({
    contentRef
  })

  return (
    <div>
      <Button
        onClick={() => reactToPrintFn()}
        variant='primary'
        icon={<PdfIcon className='w-4 h-4' />}
      >
        Descargar PDF
      </Button>

      {/* Contenido oculto para imprimir */}
      <div ref={contentRef} className='hidden print:block p-10 text-black'>
        <div className=' w-full max-w-2xl mx-auto'>
          {/* Título */}
          <h1 className='text-2xl font-bold text-center mb-6'>
            Libro de Reclamaciones de {claim?.user.company_name}
          </h1>

          {/* Datos generales */}
          <p className='text-lg font-semibold'>
            Código de identificación del libro de reclamaciones:{' '}
            <span className='font-normal'>{claim?.claim_code}</span>
          </p>
          <p className='text-lg font-semibold'>
            Estado de reclamación a la fecha:{' '}
            <span className='font-normal'>
              {dayjs().format('DD/MM/YYYY, HH:mm:ss')}
            </span>
          </p>
          <p className='text-lg font-semibold'>
            Reclamación {claim?.claim_code}
          </p>
          <p className='text-lg font-semibold'>
            Fecha de reclamación:{' '}
            <span className='font-normal'>
              {dayjs(claim?.created_at).format('DD/MM/YYYY')}
            </span>
          </p>
          <p className='text-lg font-semibold'>
            Número correlativo:{' '}
            <span className='font-normal'>{claim?.numeration}</span>
          </p>

          {/* Datos del proveedor */}
          <h2 className='text-xl font-bold mt-6 mb-2'>Proveedor</h2>
          <p>
            <span className='font-semibold'>Nombre:</span>{' '}
            {claim?.user.company_name}
          </p>
          <p>
            <span className='font-semibold'>RUC:</span> {claim?.user.company_ruc}
          </p>
          <p>
            <span className='font-semibold'>Domicilio fiscal:</span>{' '}
            {claim?.user.company_address}
          </p>

          {/* Datos del establecimiento */}
          <h2 className='text-xl font-bold mt-6 mb-2'>Establecimiento</h2>
          <p>
            <span className='font-semibold'>Nombre:</span>{' '}
            {claim?.establishment.name}
          </p>
          <p>
            <span className='font-semibold'>Dirección:</span>{' '}
            {claim?.establishment.type_address === 'Fisico'
              ? claim?.establishment.address
              : claim?.establishment.web_page}
          </p>

          {/* Datos del consumidor */}
          <h2 className='text-xl font-bold mt-6 mb-2'>Consumidor</h2>
          <p>
            <span className='font-semibold'>Nombre completo:</span>{' '}
            {claim?.name}
          </p>
          <p>
            <span className='font-semibold'>Documento:</span>{' '}
            {claim?.document_type.abreviation} {claim?.document_number}
          </p>
          <p>
            <span className='font-semibold'>Correo electrónico:</span>{' '}
            {claim?.email}
          </p>

          {/* Detalles del bien contratado */}
          <h2 className='text-xl font-bold mt-6 mb-2'>Bien contratado</h2>
          <p>
            <span className='font-semibold'>Tipo:</span> {claim?.type_asset}
          </p>
          <p>
            <span className='font-semibold'>Descripción:</span>{' '}
            {claim?.description_asset}
          </p>
          <p>
            <span className='font-semibold'>Monto reclamado:</span>{' '}
            {claim?.currency_type?.name} ({claim?.currency_type?.symbol}){' '}
            {claim?.claim_mount}
          </p>

          {/* Detalles de la reclamación */}
          <h2 className='text-xl font-bold mt-6 mb-2'>Reclamación</h2>
          <p>
            <span className='font-semibold'>Tipo:</span> {claim?.claim_type}
          </p>
          <p>
            <span className='font-semibold'>Descripción:</span>{' '}
            {claim?.claim_text}
          </p>
          <p>
            <span className='font-semibold'>Solicitud del consumidor:</span>{' '}
            {claim?.request_text}
          </p>

          {/* Respuesta */}
          <h2 className='text-xl font-bold mt-6 mb-2'>Respuesta</h2>
          <p>
            <span className='font-semibold'>Fecha de la respuesta:</span>{' '}
            {claim?.answer_date
              ? dayjs(claim.answer_date).format('DD/MM/YYYY')
              : 'Pendiente'}
          </p>
          <p>
            <span className='font-semibold'>Respuesta:</span>{' '}
            {claim?.answer || 'Aún no se ha emitido una respuesta.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DownloadClaimPDF
