'use client'
import { DeleteIcon, EditIcon } from '@/core/components/icons'
import Modal from '@/core/components/modal'
import { FetchTable } from '@/core/components/table'
import { Badge, Button, Card } from '@/core/components/ui'
import { createColumnHelper } from '@tanstack/react-table'
import { Fragment, useCallback, useMemo, useState } from 'react'

import { useModal } from '@/core/hooks/utils/use-modal'
import { SelectionPageGet } from '../types/selection-page'
import { LinkIcon } from '@heroicons/react/24/solid'
import { getAllSelectionPagesWithParams } from '../actions/selection-page'
import SelectionPagesForm from './selection-pages-form'

const QUERY_KEY = 'selection-page-with-params'

const SelectionPagesTable = () => {
  const { openModal } = useModal()

  const [selectedPage, setSelectedPage] = useState<SelectionPageGet | null>(
    null
  )
  const openSelectionPageModal = useCallback(
    (page: SelectionPageGet | null) => {
      setSelectedPage(page)
      openModal({
        elementById: 'edit-selection-page'
      })
    },
    [openModal]
  )
  //para la tabla
  const columnHelper = createColumnHelper<any>()
  const columns = useMemo(
    () => [
      columnHelper.accessor('custom_link', {
        header: () => <p className='text-center text-sm'>Link personalizado</p>,
        size: 30,
        cell: (info) => {
          return <p className='text-center'>{info.getValue()}</p>
        }
      }),
      columnHelper.accessor('establishments', {
        header: () => <p className='text-center text-sm'>Establecimientos</p>,
        size: 30,
        cell: (info) => {
          //TODO: Numero de reclamaciones para el establecimiento
          return <p className='text-center'>{info.getValue().length}</p>
        }
      }),
      columnHelper.accessor('brand_name', {
        header: () => <p className='text-center text-sm'>Marca</p>,
        size: 30,
        cell: (info) => {
          return <p className='text-center'>{info.getValue()}</p>
        }
      }),
      columnHelper.accessor('logo_url', {
        header: () => <p className='text-center text-sm'>Logo</p>,
        size: 30,
        cell: (info) => {
          return (
            <div className='text-center  justify-center items-center'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={info.getValue()} alt='Logo' className='mx-auto w-20 h-20' />
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
                handleClick={() => {
                  openSelectionPageModal(props.row.original)
                }}
              >
                <EditIcon className='w-4 h-4' />
              </Badge>
              <Badge
                className='cursor-pointer w-10 h-10 bg-green-400 border-green-400'
                handleClick={() => {
                  window.open(
                    `/seleccion-establecimiento/${props.row.original.user_id}/${props.row.original.custom_link}`,
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
    [columnHelper, openSelectionPageModal]
  )

  return (
    <Fragment>
      <Card title='Páginas de selección' className='w-full max-w-7xl'>
        <div className='flex justify-end items-center mb-4'>
          <Button
            variant='primary'
            onClick={() =>
              openModal({
                elementById: 'create-selection-page'
              })
            }
          >
            Crear página de selección
          </Button>
        </div>

        <FetchTable
          columns={columns}
          fetchData={getAllSelectionPagesWithParams}
          queryKey={QUERY_KEY}
        />
      </Card>

      <Modal elementById='create-selection-page'>
        <SelectionPagesForm type='create' key={crypto.randomUUID()} />
      </Modal>
      <Modal elementById='edit-selection-page'>
        <SelectionPagesForm
          type='edit'
          page={selectedPage}
          key={crypto.randomUUID()}
        />
      </Modal>
    </Fragment>
  )
}

export default SelectionPagesTable
