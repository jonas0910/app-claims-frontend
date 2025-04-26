'use client'

import { EditIcon, PdfIcon } from '@/core/components/icons'
import { FetchTable } from '@/core/components/table'
import {
  Badge,
  Button,
  Card,
  SearchField,
  Select,
  SelectWithSearch,
  TextField
} from '@/core/components/ui'
import { useAuthSessionStore } from '@/core/store/auth/auth-session-store'
import { BookOpenIcon, LinkIcon, QrCodeIcon } from '@heroicons/react/24/solid'
import { createColumnHelper } from '@tanstack/react-table'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { getAllEstablishmentWithParams } from '../actions/establishment'
import { useModal } from '@/core/hooks/utils/use-modal'
import Modal from '@/core/components/modal'
import CreateEstablishmentForm from './create-establishment-form'
import DownloadClaimBook from './pdf-download-claim-book/download-claim-book'
import { EstablishmentGet } from '../types/establishment'
import { useRouter } from 'next/navigation'
import QrGenerate from './qr-generate/qr-generate'
import { baseUrlClaim } from '../helpers/custom-link'
import EstablishmentFilterForm from './establishment-filter-form'
import { Claim } from '../../claims-list/types/claim'

const QUERY_KEY = 'establishments-with-params'

interface EstablishmentsTableProps {}

const EstablishmentTable = ({}: EstablishmentsTableProps) => {
  const { openModal } = useModal()

  const [selectedEstablishment, setSelectedEstablishment] =
    useState<EstablishmentGet | null>(null)
  const openEstablishmentModal = useCallback(
    (type: string, establishment: EstablishmentGet | null) => {
      setSelectedEstablishment(establishment)
      openModal({
        elementById: type === 'edit' ? 'edit-establishment' : 'qr-generate'
      })
    },
    [openModal]
  )

  //para la tabla
  const columnHelper = createColumnHelper<any>()
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: () => <p className='text-center text-sm'>Nombre</p>,
        size: 30,
        cell: (info) => {
          return <p className='text-center'>{info.getValue()}</p>
        }
      }),
      columnHelper.accessor('custom_link', {
        header: () => (
          <p className='text-center text-sm'>Libro de reclamaciones virtual</p>
        ),
        size: 30,
        cell: (info) => {
          return (
            <p className='text-center'>{`${baseUrlClaim}/${info.row.original.user_id}/${info.getValue()}`}</p>
          )
        }
      }),
      columnHelper.accessor('claims', {
        header: () => <p className='text-center text-sm'>Reclamaciones</p>,
        size: 30,
        cell: (info) => {
          //TODO: Numero de reclamaciones para el establecimiento
          return (
            <p className='text-center'>{(info.getValue() as Claim[]).length}</p>
          )
        }
      }),
      columnHelper.accessor('type_address', {
        header: () => (
          <p className='text-center text-sm'>Dirección del establecimiento</p>
        ),
        size: 30,
        cell: (info) => {
          console.log('info', info.getValue())
          return (
            <div>
              <p className='text-center'>
                {info.getValue() == 'Online'
                  ? info.row.original.web_page
                  : info.row.original.address}
              </p>
              <p className='text-center text-xs'>{info.getValue()}</p>
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
              <Badge
                className='cursor-pointer w-10 h-10'
                // handleClick={() =>
                //   //TODO: aqui en vez de ir directo debe llamar una funcion para pasarle el establecimiento a editar
                //   openModal({
                //     elementById: 'edit-establishment'
                //   })
                // }
                handleClick={() => {
                  openEstablishmentModal('edit', props.row.original)
                }}
              >
                <EditIcon className='w-4 h-4' />
              </Badge>
              <DownloadClaimBook
                custom_link={`${baseUrlClaim}/${props.row.original.user_id}/${props.row.original.custom_link}`}
              />
              <Badge
                className='cursor-pointer w-10 h-10 bg-green-400 border-green-400'
                handleClick={() =>
                  openEstablishmentModal('qr-generate', props.row.original)
                }
              >
                <QrCodeIcon className='w-4 h-4' />
              </Badge>
              <Badge
                className='cursor-pointer w-10 h-10 bg-green-400 border-green-400'
                handleClick={() => {
                  // router.push('/reclamo-virtual/idloco/linkdescocao')
                  //windows.open('/reclamo-virtual/asdf-asdf-asdf-asdf/{props.row.original.custom_link}', '_blank')
                  window.open(
                    `/reclamo-virtual/${props.row.original.user_id}/${props.row.original.custom_link}`,
                    '_blank'
                  )
                }}
              >
                <LinkIcon className='w-4 h-4' />
              </Badge>
            </div>
          </Fragment>
        )
      })
    ],
    [columnHelper, openEstablishmentModal]
  )

  //Para buscar y resetear los filtros
  const [filters, setFilters] = useState({})

  return (
    <Fragment>
      <EstablishmentFilterForm setFilters={setFilters} filters={filters} />
      <Card title='Establecimientos' className='w-full max-w-7xl'>
        {/* <div className='flex justify-end items-center mb-4'>
          <div className='flex gap-5'>
            <PdfExcelDownloader
              dataToExport={dataToExport || []}
              columnsToExport={columnsToExport || []}
              filename='Lista de Agencias'
            />
          </div>
        </div> */}
        <div className='flex justify-end items-center mb-4'>
          <Button
            variant='primary'
            onClick={() =>
              openModal({
                elementById: 'create-establishment'
              })
            }
          >
            Crear Establecimiento
          </Button>
        </div>

        <FetchTable
          columns={columns}
          fetchData={getAllEstablishmentWithParams}
          queryKey={QUERY_KEY}
          externalfilters={filters}
        />
      </Card>

      <Modal elementById='create-establishment'>
        <CreateEstablishmentForm
          key={crypto.randomUUID()}
          elementById='create-establishment'
        />
      </Modal>
      <Modal elementById='edit-establishment'>
        <CreateEstablishmentForm
          key={new Date().getTime().toString()}
          establishment={selectedEstablishment}
          elementById='edit-establishment'
        />
      </Modal>
      <Modal elementById='qr-generate'>
        <QrGenerate
          link_personalizado={`${baseUrlClaim}/${selectedEstablishment?.user_id}/${selectedEstablishment?.custom_link}`}
        />
      </Modal>
    </Fragment>
  )
}

export default EstablishmentTable
