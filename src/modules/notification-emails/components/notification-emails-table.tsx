'use client'
import { DeleteIcon, EditIcon } from '@/core/components/icons'
import { Badge, Button, Card } from '@/core/components/ui'
import { createColumnHelper } from '@tanstack/react-table'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { useModal } from '@/core/hooks/utils/use-modal'
import { FetchTable } from '@/core/components/table'
import {
  getAllNotificationEmailsWithParams
} from '../actions/notification-email'
import Modal from '@/core/components/modal'
import NotificationEmailsForm from './notification-emails-form'
import { NotificationEmailGet } from '../types/notification-email'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { useSendVerificationEmail } from '../hooks/requests/use-send-verification-email'
import { Establishment } from '../../establishments/types/establishment'

const QUERY_KEY = 'notification-email-with-params'

const NotificationEmailTable = () => {
  const { openModal } = useModal()
  const { sendVerificationEmailFn, isPending } = useSendVerificationEmail()

  const [selectedEmail, setSelectedEmail] =
    useState<NotificationEmailGet | null>(null)
  const openEmailModal = useCallback(
    (email: NotificationEmailGet | null) => {
      setSelectedEmail(email)
      openModal({
        elementById: 'edit-notification-email'
      })
    },
    [openModal]
  )
  //para la tabla
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>()
  const columns = useMemo(
    () => [
      columnHelper.accessor('email', {
        header: () => <p className='text-center text-sm'>Correo electrónico</p>,
        size: 30,
        cell: (info) => {
          return <p className='text-center'>{info.getValue()}</p>
        }
      }),
      columnHelper.accessor('establishment', {
        header: () => <p className='text-center text-sm'>Establecimiento</p>,
        size: 30,
        cell: (info) => {
          return <p className='text-center'>{(info.getValue() as Establishment)?.name}</p>
        }
      }),
      columnHelper.accessor('verified', {
        header: () => <p className='text-center text-sm'>Estado</p>,
        size: 30,
        cell: (info) => {
          //TODO: Numero de reclamaciones para el establecimiento
          return <div className='text-center'>{
            info.getValue() ? (
              <div className='flex items-center justify-center gap-1'>
                <CheckCircleIcon className='w-4 h-4 text-green-400'/>
                <p className='text-green-400'>
                  Verificado
                </p>
              </div>
            ): (
              <div className='flex items-center justify-center gap-1'>
                <ExclamationCircleIcon className='w-4 h-4 text-red-400'/>
                <p className='text-red-400'>
                  No verificado
                </p>
              </div>
            )
          }</div>
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
                handleClick={() => {
                  openEmailModal(props.row.original)
                }}
              >
                <EditIcon className='w-4 h-4' />
              </Badge>
              <Badge
                className='cursor-pointer w-10 h-10 bg-red-400 border-red-400'
                handleClick={() => {
                  // deleteNotificationEmail(props.row.original.id)
                  console.log('delete')
                }}
              >
                <DeleteIcon className='w-4 h-4' />
              </Badge>
              <Button
                variant='primary'
                onClick={() => {
                  sendVerificationEmailFn(props.row.original)
                }}
                disabled={isPending}
              >
                Verificar
              </Button>
            </div>
          </Fragment>
        )
      })
    ],
    // [columnHelper, openCategoryModal]
    [columnHelper, isPending, openEmailModal, sendVerificationEmailFn]
  )

  return (
    <Fragment>
      <Card title='Correos de notificación' className='w-full max-w-7xl'>
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
          <div className='flex gap-5'>
            <Button
              variant='primary'
              onClick={
                //   () => console.log('Crear categoria')
                () =>
                  openModal({
                    elementById: 'create-notification-email'
                  })
              }
            >
              Crear correo
            </Button>
          </div>
        </div>

        <FetchTable
          columns={columns}
          fetchData={getAllNotificationEmailsWithParams}
          queryKey={QUERY_KEY}
        />
      </Card>

      <Modal elementById='create-notification-email' size='tiny'>
        <NotificationEmailsForm type='create' key={crypto.randomUUID()} />
      </Modal>
      <Modal elementById='edit-notification-email' size='tiny'>
        <NotificationEmailsForm
          type='edit'
          email={selectedEmail}
          key={crypto.randomUUID()}
        />
      </Modal>
    </Fragment>
  )
}

export default NotificationEmailTable
