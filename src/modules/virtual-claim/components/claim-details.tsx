'use client'

import { useParams } from 'next/navigation'
import { useClaimByCode } from '../hooks/use-claim-by-code'
import { Card } from '@/core/components/ui'
// import { getCompanyLogo } from '@/core/helpers/company_logos'
import Image from 'next/image'
import DownloadClaimPDF from '../../claims-list/components/pdf-download-claim/download-claim-pdf'
import dayjs from 'dayjs'

const ClaimDetails = () => {
  const params = useParams<{ code: string }>()
  const { claim, isLoading } = useClaimByCode(params.code)

  // const logo = getCompanyLogo({
  //   companyId: Number(claim?.company.id),
  //   usePdf: false
  // })

  const logo = '/28542127_7459345.svg'
  return (
    <>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        claim && (
          <div className='flex items-center justify-center flex-col pb-10'>
            <div>
              <div className='w-[150px] h-[150px] bg-white rounded-full flex items-center justify-center mt-10'>
                <Image
                  src={logo}
                  width={140}
                  height={140}
                  alt='Foto'
                  className='rounded-full'
                />
              </div>

              <p className='font-bold text-2xl mt-5 text-center'>
                {claim?.user.company_name}
              </p>
              <p className='text-center'>RUC: {claim?.user.company_ruc}</p>
            </div>
            <div>
              <h1 className='font-bold text-4xl mt-10 text-center'>
                Libro de reclamaciones
              </h1>
              <p className='text-center'>
                Codigo de identificación: {claim?.establishment.code}
              </p>
              <p className='font-bold text-2xl mt-10 text-center'>
                {claim?.user.company_name}
              </p>
              <p className='text-center'>{claim.user.company_address}</p>
            </div>
            <div className='my-5 flex flex-col gap-4 justify-center items-center'>
              <p>Codigo de reclamación: {claim?.claim_code}</p>
              <p>
                Fecha de reclamación:{' '}
                {dayjs(claim?.created_at).format('DD/MM/YYYY')}
              </p>
              <DownloadClaimPDF claim={claim} />
            </div>
            <div className='mx-auto sm:w-1/2 md:w-1/3 w-full'>
              <Card title='Proveedor del bien o servicio' className='my-5'>
                <div>
                  <p>{claim.user.company_name}</p>
                  <p>RUC: {claim.user.company_ruc}</p>
                  <p>{claim.user.company_address}</p>

                  <h3 className='font-bold mt-5'>Establecimiento</h3>
                  <p>
                    {claim?.establishment.type_address === 'Fisico'
                      ? claim?.establishment.address
                      : claim?.establishment.web_page}
                  </p>
                </div>
              </Card>
              <Card title='Consumidor reclamante' className='my-5'>
                <div>
                  <p>{claim.name}</p>
                  <p>
                    {claim.document_type.abreviation}: {claim.document_number}
                  </p>
                  <p>Correo electrónico: {claim.email}</p>
                </div>
              </Card>
              <Card title='Bien contratado' className='my-5'>
                <div>
                  <h3 className='font-bold'>{claim.type_asset}</h3>
                  <p>{claim.description_asset}</p>

                  <h3 className='font-bold mt-5'>Monto reclamado</h3>
                  <p>
                    {claim?.claim_mount
                      ? `${claim?.currency_type.symbol} ${claim?.claim_mount}`
                      : 'No especificado'}
                  </p>
                </div>
              </Card>
              <Card title='Reclamación y pedido' className='my-5'>
                <div>
                  <h3 className='font-bold'>
                    {claim.claim_type === 'reclamo' ? 'Reclamo' : 'Queja'}
                  </h3>
                  <p>{claim.claim_text}</p>

                  <h3 className='font-bold mt-5'>Pedido</h3>
                  <p>{claim?.request_text}</p>
                </div>
              </Card>
              <Card title='Respuesta' className='my-5'>
                <div>
                  {claim.answer_date ? (
                    <>
                      <h3 className='font-bold'>Fecha de respuesta</h3>
                      <p>
                        {claim.answer_date
                          ? dayjs(claim.answer_date).format('DD/MM/YYYY')
                          : 'No respondido'}
                      </p>

                      <h3 className='font-bold mt-5'>Respuesta</h3>
                      <p>{claim.answer}</p>
                    </>
                  ) : (
                    <h3>No respondido</h3>
                  )}
                </div>
              </Card>

              {/* <p>{claim.company.trade_name}</p>
              <p>RUC: {claim.company.ruc}</p>
              <p>{claim.company.fiscal_address}</p> */}
              {/* <p className='text-sm text-gray-500 justify-items-stretch text-justify my-5'>
              Al enviar esta reclamación, usted acepta y consiente expresamente que
              sus datos personales serán tratados para gestionar su reclamación,
              conforme a nuestras políticas de privacidad y las leyes peruanas
              aplicables, incluyendo la Ley N° 29733. Nos comprometemos a tratar
              estos datos con la máxima confidencialidad y seguridad. Para más
              información, consulte nuestra política de privacidad y nuestros
              términos y condiciones.
            </p> */}
            </div>
          </div>
        )
      )}
    </>
  )
}

export default ClaimDetails
