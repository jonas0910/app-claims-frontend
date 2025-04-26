import {
  Button,
  Card,
  DateField,
  NumberFieldReadOnly,
  Textarea,
  TextFieldReadOnly
} from '@/core/components/ui'
import { ClaimGet, ClaimPut } from '../types/claim'
import { FormProvider } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import SelectMultipleWithSearch from '@/core/components/ui/select-multiple-with-search'
import { useCategoriesClaim } from '../../categories_claim/hooks/requests/use-category-claim'
import {
  EditClaimInputsType,
  editClaimSchema
} from '../schema/edit-claim-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateClaim } from '../hooks/use-update-claim'
import { useModal } from '@/core/hooks/utils/use-modal'
import DownloadClaimPDF from './pdf-download-claim/download-claim-pdf'
import { LinkIcon } from '@heroicons/react/24/solid'

interface EditClaimFormProps {
  claim: ClaimGet | null
}

const EditClaimForm = ({ claim }: EditClaimFormProps) => {
  const form = useForm<EditClaimInputsType>({
    mode: 'onBlur',
    resolver: zodResolver(editClaimSchema),
    defaultValues: {
      answer: claim?.answer || '',
      email_contact_date: claim?.email_contact_date
        ? claim?.email_contact_date.split(' ')[0]
        : '',
      phone_contact_date: claim?.phone_contact_date
        ? claim?.phone_contact_date.split(' ')[0]
        : '',
      internal_notes: claim?.internal_notes || '',
      categories: claim?.categories.map((cat) => cat.id) || []
    }
  })

  const { updateClaimFn, isPending } = useUpdateClaim()
  const { closeModal } = useModal()

  // escribiendo respuesta
  const answerText = form.watch('answer')

  const onSubmit = async (data: EditClaimInputsType) => {
    const dataToSend = {
      answer: data.answer,
      email_contact_date: data.email_contact_date,
      phone_contact_date: data.phone_contact_date,
      internal_notes: data.internal_notes,
      categories: data.categories,
      user_id: claim?.user.id
    } as ClaimPut

    const resp = await updateClaimFn({
      data: dataToSend,
      id: claim?.id as number
    })

    if (resp.status === 201 || resp.status === 200) {
      form.reset()
      closeModal({ elementById: 'edit-claim' })
    } else {
      console.log('Error al crear la categoria')
    }
    console.log('data', data)
  }

  const { categoriesClaimToSelect, isLoading } = useCategoriesClaim()
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card
          title='Editar Reclamación'
          extra={
            <div className='p-5 flex gap-4'>
              <DownloadClaimPDF claim={claim} />
              <Button
                type='button'
                icon={<LinkIcon className='w-4 h-4' />}
                onClick={() =>
                  window.open(`/reclamacion//${claim?.claim_code}`, '_blank')
                }
              >
                Ver página pública
              </Button>
            </div>
          }
        >
          <div className='grid grid-cols-6 gap-4'>
            <div className='col-span-4 border-r-2 border-gray-200 pr-4'>
              {/* Bien contratado */}
              <div className='grid grid-cols-2 gap-4 border-b-2 border-gray-200 pb-4 mb-4'>
                <TextFieldReadOnly
                  label='Tipo de bien contratado'
                  inputName='type_asset'
                  value={claim?.type_asset || ''}
                />

                {claim?.claim_mount && (
                  <NumberFieldReadOnly
                    label='Monto de la reclamación'
                    inputName='claim_mount'
                    value={claim?.claim_mount}
                    symbol={claim?.currency_type.symbol}
                  />
                )}
                <div className='col-span-2'>
                  <TextFieldReadOnly
                    label='Descripción del bien contratado'
                    inputName='description_asset'
                    value={claim?.description_asset || ''}
                  />
                </div>
              </div>

              {/* Reclamación */}
              <div className='grid grid-cols-2 gap-4 border-b-2 border-gray-200 pb-4 mb-4'>
                <TextFieldReadOnly
                  label='Tipo de reclamación'
                  inputName='claim_type'
                  value={claim?.claim_type || ''}
                />
                <TextFieldReadOnly
                  label='Fecha de reclamación'
                  inputName='created_at'
                  value={claim?.created_at || ''}
                />
                <div className='col-span-2'>
                  <TextFieldReadOnly
                    label='Descripción de la reclamación'
                    inputName='claim_text'
                    value={claim?.claim_text || ''}
                  />
                </div>
                <div className='col-span-2'>
                  <TextFieldReadOnly
                    label='Solicitud del consumidor'
                    inputName='request_text'
                    value={claim?.request_text || ''}
                  />
                </div>
              </div>
              {/* Respuesta */}
              <div className='grid grid-cols-2 gap-4 border-b-2 border-gray-200 pb-4 mb-4'>
                {claim?.answer ? (
                  <>
                    <div className='col-span-2'>
                      <TextFieldReadOnly
                        label='Fecha de respuesta'
                        inputName='answer_date'
                        value={claim?.answer_date || ''}
                      />
                    </div>
                    <div className='col-span-2'>
                      <TextFieldReadOnly
                        label='Respuesta'
                        inputName='answer'
                        value={claim?.answer || ''}
                      />
                    </div>
                  </>
                ) : (
                  <div className='col-span-2'>
                    <Textarea
                      label='Respuesta'
                      inputName='answer'
                      inputError={form.formState.errors.answer}
                    />
                  </div>
                )}
                {!(answerText === '' || answerText === null) && (
                  <>
                    <DateField
                      label='Fecha de contacto por correo'
                      inputName='email_contact_date'
                      inputError={form.formState.errors.email_contact_date}
                    />
                    <DateField
                      label='Fecha de contacto por teléfono'
                      inputName='phone_contact_date'
                      inputError={form.formState.errors.phone_contact_date}
                    />
                  </>
                )}
              </div>

              {/* Apuntes internos */}
              <div className='grid grid-cols-1 gap-4 border-b-2 border-gray-200 pb-4 mb-4'>
                <Textarea
                  label='Apuntes internos'
                  inputName='internal_notes'
                  inputError={form.formState.errors.internal_notes}
                />
              </div>

              {/* Otra informacion */}
              <div className='grid grid-cols-2 gap-4 col-span-3 row-span-3'>
                <TextFieldReadOnly
                  label='Código de reclamación'
                  inputName='claim_code'
                  value={claim?.claim_code || ''}
                />
                <SelectMultipleWithSearch
                  label='Categorías'
                  inputName='categories'
                  options={categoriesClaimToSelect}
                  inputError={form.formState.errors.categories}
                />
              </div>
            </div>
            <div className='col-span-2'>
              {/* Consumidor reclamante */}
              <div className='grid gap-4 border-b-2 border-gray-200 pb-4 mb-4'>
                <TextFieldReadOnly
                  label='Nombre del consumidor'
                  inputName='name'
                  value={claim?.name || ''}
                />
                <TextFieldReadOnly
                  label='Documento de identidad'
                  inputName='document_type'
                  value={claim?.document_number || ''}
                  symbol={claim?.document_type?.abreviation}
                />
                <TextFieldReadOnly
                  label='Correo electrónico'
                  inputName='email'
                  value={claim?.email || ''}
                />
                <TextFieldReadOnly
                  label='Teléfono'
                  inputName='phone'
                  value={claim?.phone || ''}
                />
              </div>

              {/* Establecimiento */}
              <div className='grid gap-4 border-b-2 border-gray-200 pb-4 mb-4'>
                <TextFieldReadOnly
                  label='Establecimiento'
                  inputName='establishment_id'
                  value={claim?.establishment.name || ''}
                />
                <TextFieldReadOnly
                  label='Dirección del establecimiento'
                  inputName='establishment_id'
                  value={
                    claim?.establishment.type_address === 'Fisico'
                      ? claim?.establishment.address
                      : claim?.establishment.web_page || ''
                  }
                />
                <TextFieldReadOnly
                  label='Código de identificación del establecimiento'
                  inputName='establishment_id'
                  value={claim?.establishment.code || ''}
                />
              </div>

              {/* Proveedor */}
              <div className='grid gap-4 '>
                <TextFieldReadOnly
                  label='Nombre del proveedor de bienes o servicios'
                  inputName='company_id'
                  value={claim?.user.company_name || ''}
                />
                <TextFieldReadOnly
                  label='RUC'
                  inputName='company_id'
                  value={claim?.user.company_ruc || ''}
                />
              </div>
            </div>
          </div>
          <div className='flex justify-center mt-10'>
            <Button type='submit' disabled={isLoading}>
              Guardar cambios
            </Button>
          </div>
        </Card>
      </form>
    </FormProvider>
  )
}

export default EditClaimForm
