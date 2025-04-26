import { Button, Card, SelectWithSearch, TextField } from '@/core/components/ui'
import { useModal } from '@/core/hooks/utils/use-modal'
import { FormProvider, useForm } from 'react-hook-form'
import { useCreateCategoryClaim } from '../hooks/requests/use-create-category-claim'
import {
  CategoryClaimGet,
  CategoryClaimPostPut
} from '../types/categories-claim'
import {
  CategoryClaimInputsType,
  categoryClaimSchema
} from '../models/category-claim-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateCategoryClaim } from '../hooks/requests/use-update-category-claim'
// import { useAuthSessionStore } from '@/core/store/auth/auth-session-store'
import { useEstablishment } from '../../establishments/hooks/requests/use-establishments'

interface CategoriesClaimFormProps {
  type: string
  category?: CategoryClaimGet | null
}

const CategoriesClaimForm = ({ type, category }: CategoriesClaimFormProps) => {
  const form = useForm<CategoryClaimInputsType>({
    mode: 'all',
    resolver: zodResolver(categoryClaimSchema),
    defaultValues: {
      name: category?.name ?? '',
      establishment_id: category?.establishment?.id ?? null
    }
  })

  // const { company } = useAuthSessionStore()
  const { closeModal } = useModal()
  const { createCategoryClaimFn, isPending } = useCreateCategoryClaim()
  const { updateCategoryClaimFn, isPending: isPendingUpdate } =
    useUpdateCategoryClaim()
  const { establishmentsToSelect, isLoading } = useEstablishment()

  const onSubmit = async (data: CategoryClaimInputsType) => {
    const categoryToSend = {
      name: data.name,
      establishment_id: data.establishment_id,
      // company_id: company?.id
      user_id: 1,
    } as CategoryClaimPostPut
    let resp

    if (type === 'edit') {
      resp = await updateCategoryClaimFn({
        data: categoryToSend,
        id: category?.id ?? 0
      })
    } else {
      resp = await createCategoryClaimFn(categoryToSend)
    }

    if (resp.status === 201 || resp.status === 200) {
      form.reset()
      closeModal({ elementById: 'create-category-claim' })
      closeModal({ elementById: 'edit-category-claim' })
    } else {
      console.log('Error al crear la categoria')
    }
    console.log('data', data)
  }

  return (
    <Card title={type === 'edit' ? 'Editar categoria' : 'Crear categoria'}>
      {/* <CreateCategoryClaim /> */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4'>
            <TextField
              label='Nombre'
              inputName='name'
              inputError={form.formState.errors.name}
            />
            <SelectWithSearch
              label='Establecimiento'
              inputName='establishment_id'
              inputError={form.formState.errors.establishment_id}
              options={establishmentsToSelect}
              loading={isLoading}
            />
            <Button
              type='submit'
              variant='primary'
              disabled={isPending || isPendingUpdate}
            >
              {type === 'edit' ? 'Guardar' : 'Crear'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Card>
  )
}

export default CategoriesClaimForm
