import { Button, Card, TextField } from '@/core/components/ui'
import { useModal } from '@/core/hooks/utils/use-modal'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
// import { useAuthSessionStore } from '@/core/store/auth/auth-session-store'
import { SelectionPageGet } from '../types/selection-page'
import {
  SelectionPageInputsType,
  selectionPageSchema
} from '../models/selection-page-schema'
import { useCreateSelectionPage } from '../hooks/requests/use-create-selection-page'
import { useUpdateSelectionPage } from '../hooks/requests/use-update-selection.page'
import { useEstablishment } from '../../establishments/hooks/requests/use-establishments'
import SelectMultipleWithSearch from '@/core/components/ui/select-multiple-with-search'
import LogoUploadInput from './ui/logo-upload-input'

interface SelectionPagesFormProps {
  type: string
  page?: SelectionPageGet | null
}

const SelectionPagesForm = ({ type, page }: SelectionPagesFormProps) => {
  const form = useForm<SelectionPageInputsType>({
    mode: 'all',
    resolver: zodResolver(selectionPageSchema),
    defaultValues: {
      custom_link: page?.custom_link ?? '',
      establishments:
        page?.establishments.map((establishment) => establishment.id) ?? [],
      brand_name: page?.brand_name ?? ''
      // logo_url: page?.logo_url ?? ''
    }
  })

  const { establishmentsToSelect } = useEstablishment()

  // const { company } = useAuthSessionStore()
  const { closeModal } = useModal()

  const { createSelectionPageFn, isPending } = useCreateSelectionPage()
  const { updateSelectionPageFn, isPending: isPendingUpdate } =
    useUpdateSelectionPage()

  const onSubmit = async (data: SelectionPageInputsType) => {
    const formData = new FormData()
    formData.append('custom_link', data.custom_link)
    formData.append('brand_name', data.brand_name ?? '')
    // formData.append('company_id', company?.id.toString() ?? '')
    formData.append('user_id', '1') // Cambiar por el id de la compañia

    // Agregar los establecimientos
    data.establishments?.forEach((establishment, index) => {
      formData.append(`establishments[${index}]`, establishment.toString())
    })

    const file =
      type === 'create'
        ? data.logo_url_create?.[0]
        : (data.logo_url_edit?.[0] ?? null)

    if (file) {
      formData.append('logo_url', file) // Agregar el archivo al FormData
    }

    let resp

    if (type === 'edit') {
      resp = await updateSelectionPageFn({
        data: formData,
        id: page?.id ?? 0
      })
    } else {
      resp = await createSelectionPageFn(formData)
    }

    if (resp?.status === 201 || resp?.status === 200) {
      form.reset()
      closeModal({ elementById: 'create-selection-page' })
      closeModal({ elementById: 'edit-selection-page' })
    } else {
      console.log('Error al crear la página de selección')
    }
  }

  return (
    <Card
      title={
        type === 'edit'
          ? 'Editar página de selección'
          : 'Crear página de selección'
      }
    >
      {/* <CreateCategoryClaim /> */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4 '>
            <div className='flex gap-4'>
              <TextField
                label='Link personalizado'
                inputName='custom_link'
                inputError={form.formState.errors.custom_link}
              />

              <SelectMultipleWithSearch
                label='Establecimiento'
                inputName='establishments'
                inputError={form.formState.errors.establishments?.[0]}
                options={establishmentsToSelect}
                key={crypto.randomUUID()}
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <TextField
                label='Marca'
                inputName='brand_name'
                inputError={form.formState.errors.brand_name}
              />
              <div className='grid-cols-2 col-span-1'>
                {type === 'edit' ? (
                  <LogoUploadInput
                    inputName='logo_url_edit'
                    title='Subir logo'
                    label='Logo'
                    initialPreview={page?.logo_url}
                    key={crypto.randomUUID()}
                  />
                ) : (
                  <LogoUploadInput
                    inputName='logo_url_create'
                    title='Subir logo'
                    label='Logo'
                    key={crypto.randomUUID()}
                  />
                )}
              </div>
            </div>
            <div className='flex justify-center'>
              <Button
                type='submit'
                variant='primary'
                disabled={isPending || isPendingUpdate}
              >
                {type === 'edit' ? 'Guardar' : 'Crear'}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </Card>
  )
}

export default SelectionPagesForm
