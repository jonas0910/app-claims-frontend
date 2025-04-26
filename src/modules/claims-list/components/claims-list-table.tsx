/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Modal from '@/core/components/modal'
import { FetchTable } from '@/core/components/table'
import { Button, Card } from '@/core/components/ui'
import { createColumnHelper } from '@tanstack/react-table'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { getAllClaimWithParams } from '../actions/claim'
import { useModal } from '@/core/hooks/utils/use-modal'
import { ClaimGet } from '../types/claim'
import {
  CheckCircleIcon,
  DocumentIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/solid'
import EditClaimForm from './edit-claim-form'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'
import ClaimsReport from './claims-report'
import DownloadExcel from '@/core/components/download-excel'
import { useClaim } from '../hooks/use-claim'
import ClaimsFilterForm from './claims-filter-form'

dayjs.extend(relativeTime)
dayjs.locale('es')

const QUERY_KEY = 'claims-list-with-params'

const ClaimsListTable = () => {
  const { openModal } = useModal()

  const [selectedClaim, setSelectedClaim] = useState<ClaimGet | null>(null)
  const openClaimModal = useCallback(
    (claim: ClaimGet | null) => {
      setSelectedClaim(claim)
      openModal({
        elementById: 'edit-claim'
      })
    },
    [openModal]
  )
  //para la tabla
  const columnHelper = createColumnHelper<any>()
  const columns = useMemo(
    () => [
      columnHelper.accessor('state', {
        header: () => <p className='text-center text-sm'>Estado</p>,
        size: 30,
        cell: (info) => {
          return (
            <>
              <div>
                {info.getValue() === 'respondido' ? (
                  <>
                    <div className='flex'>
                      <CheckCircleIcon className='w-5 h-5 mr-2 text-green-400' />
                      <p className='text-center font-bold'>Respondido</p>
                    </div>
                    <p>
                      Fecha:{' '}
                      {dayjs(info.row.original.answer_date).format(
                        'DD/MM/YYYY'
                      )}
                    </p>
                    <p className='text-xs'>
                      {info.row.original.email_contact_date &&
                        '✓ Correo electrónico'}
                    </p>
                    <p className='text-xs'>
                      {info.row.original.phone_contact_date && '✓ Teléfono'}
                    </p>
                  </>
                ) : (
                  <>
                    <div className='flex'>
                      <ExclamationCircleIcon className='w-5 h-5 mr-2 text-red-400' />
                      <p className='text-center font-bold'>Pendiente</p>
                    </div>
                  </>
                )}
              </div>
            </>
          )
        }
      }),
      columnHelper.accessor('created_at', {
        header: () => <p className='text-center text-sm'>Fecha</p>,
        size: 30,
        cell: (info) => {
          const date = dayjs(info.getValue())
          return (
            <div>
              <p className='text-center'>{date.format('DD/MM/YYYY')}</p>
              <p className='text-center text-xs'>{date.fromNow()}</p>
            </div>
          )
        }
      }),
      columnHelper.accessor('claim_code', {
        header: () => <p className='text-center text-sm'>Reclamación</p>,
        size: 30,
        cell: (info) => {
          return (
            <div>
              <p className='text-center'>{info.getValue()}</p>
              <p className='text-center text-xs'>
                {info.row.original.claim_type === 'queja' ? 'Queja' : 'Reclamo'}
              </p>
            </div>
          )
        }
      }),
      columnHelper.accessor('establishment', {
        header: () => <p className='text-center text-sm'>Establecimiento</p>,
        size: 30,
        cell: (info) => {
          return <p className='text-center'>{info.getValue().name}</p>
        }
      }),
      columnHelper.accessor('name', {
        header: () => <p className='text-center text-sm'>Reclamante</p>,
        size: 30,
        cell: (info) => {
          const data = info.row.original
          return (
            <div className=''>
              <p className='font-bold'>{data.name}</p>
              <p className='my-2'>
                {data.document_type?.abreviation}: {data.document_number}
              </p>

              <p className='text-sm font-bold text-gray-500'>
                Correo electrónico:
              </p>
              <p className='text-sm text-gray-500'>{data.email}</p>
              {data.phone && (
                <>
                  <p className='text-sm font-bold text-gray-500'>Teléfono: </p>
                  <p className='text-sm text-gray-500'> {data.phone}</p>
                </>
              )}
            </div>
          )
        }
      }),
      columnHelper.accessor('categories', {
        header: () => <p className='text-center text-sm'>Categorias</p>,
        size: 30,
        cell: (info) => {
          return (
            <div className='text-center'>
              {info.getValue().map((category: any) => (
                <div
                  key={category.id}
                  className='text-xs bg-green-100 rounded-md my-2 p-1 dark:bg-primary'
                >
                  <p className='text-primary dark:text-white'>
                    {category.name}
                  </p>
                </div>
              ))}
            </div>
          )
        }
      }),
      columnHelper.display({
        id: 'actions',
        header: () => <p className='text-center text-sm '>Acciones</p>,
        cell: (props) => (
          <Fragment>
            <div className='flex justify-center gap-2'>
              <Button
                icon={<DocumentIcon className='w-5 h-5' />}
                onClick={() => {
                  openClaimModal(props.row.original)
                }}
              >
                Ver
              </Button>
            </div>
          </Fragment>
        )
      })
    ],
    [columnHelper, openClaimModal]
  )

  const [filters, setFilters] = useState({})
  // const captureValue = (value: string) => {
  //   setFilters({ ...filters, name: value })
  // }
  const { claims } = useClaim(filters)

  const claimsDataToExport = claims?.map((claim) => ({
    claim_code: claim.claim_code,
    numeration: claim.numeration,
    company_name: claim.user.company_name,
    company_ruc: claim.user.company_ruc,
    company_address: claim.user.company_address,
    establishment_name: claim.establishment.name,
    establishment_address:
      claim.establishment.type_address === 'Fisico'
        ? claim.establishment.address
        : claim.establishment.web_page,
    establishment_code: claim.establishment.code,
    client_name: claim.name,
    client_email: claim.email,
    client_phone: claim.phone,
    client_document_type: claim.document_type.abreviation,
    client_document_number: claim.document_number,
    client_parent_name: claim.parent_name,
    type_asset: claim.type_asset,
    description_asset: claim.description_asset,
    claim_currency: claim.currency_type?.abbreviation,
    claim_mount: claim.claim_mount,
    claim_date: dayjs(claim.created_at).format('DD/MM/YYYY'),
    claim_type: claim.claim_type,
    claim_text: claim.claim_text,
    request_text: claim.request_text,
    answer: claim.answer,
    answer_date: claim.answer_date,
    email_contact_date: claim.email_contact_date,
    phone_contact_date: claim.phone_contact_date
  }))

  const claimsColumnsToExport = [
    { value: 'claim_code' as const, label: 'Código del reclamo' },
    { value: 'numeration' as const, label: 'Numeración' },
    { value: 'company_name' as const, label: 'Nombre de la empresa' },
    { value: 'company_ruc' as const, label: 'RUC de la empresa' },
    {
      value: 'company_address' as const,
      label: 'Dirección fiscal de la empresa'
    },
    {
      value: 'establishment_name' as const,
      label: 'Nombre del establecimiento'
    },
    {
      value: 'establishment_address' as const,
      label: 'Dirección del establecimiento'
    },
    {
      value: 'establishment_code' as const,
      label: 'Código del establecimiento'
    },
    { value: 'client_name' as const, label: 'Nombre del cliente' },
    { value: 'client_email' as const, label: 'Correo electrónico del cliente' },
    { value: 'client_phone' as const, label: 'Teléfono del cliente' },
    {
      value: 'client_document_type' as const,
      label: 'Tipo de documento del cliente'
    },
    {
      value: 'client_document_number' as const,
      label: 'Número de documento del cliente'
    },
    {
      value: 'client_parent_name' as const,
      label: 'Nombre del padre del cliente'
    },
    { value: 'type_asset' as const, label: 'Tipo de activo' },
    { value: 'description_asset' as const, label: 'Descripción del activo' },
    { value: 'claim_currency' as const, label: 'Moneda del reclamo' },
    { value: 'claim_mount' as const, label: 'Monto del reclamo' },
    { value: 'claim_date' as const, label: 'Fecha del reclamo' },
    { value: 'claim_type' as const, label: 'Tipo de reclamo' },
    { value: 'claim_text' as const, label: 'Texto del reclamo' },
    { value: 'request_text' as const, label: 'Texto de la solicitud' },
    { value: 'answer' as const, label: 'Respuesta' },
    { value: 'answer_date' as const, label: 'Fecha de respuesta' },
    {
      value: 'email_contact_date' as const,
      label: 'Fecha de contacto por correo'
    },
    {
      value: 'phone_contact_date' as const,
      label: 'Fecha de contacto por teléfono'
    }
  ]
  return (
    <Fragment>
      <ClaimsReport filters={filters} />
      <ClaimsFilterForm filters={filters} setFilters={setFilters} />
      <Card
        title='Lista de reclamaciones'
        className='w-full max-w-7xl'
        extra={
          <DownloadExcel
            content={claimsDataToExport || []}
            columns={claimsColumnsToExport || []}
            filename='Lista de Reclamaciones'
          />
        }
      >
        {/* <div className='flex justify-end items-center mb-4'>
          <SearchField
            label='Buscar Reclamación'
            inputName='name'
            captureValue={captureValue}
          />
          <div className='flex gap-5'>
            <Button variant='secondary'>
              Resetear Filtros
            </Button>
          </div>
        </div> */}

        <FetchTable
          columns={columns}
          fetchData={getAllClaimWithParams}
          queryKey={QUERY_KEY}
          externalfilters={filters}
        />
      </Card>

      {/* <Modal elementById='create-category-claim' size='tiny'>
        <CategoriesClaimForm type='create' key={crypto.randomUUID()} />
      </Modal> */}
      <Modal elementById='edit-claim' size='large'>
        <EditClaimForm claim={selectedClaim} key={crypto.randomUUID()} />
      </Modal>
    </Fragment>
  )
}

export default ClaimsListTable
