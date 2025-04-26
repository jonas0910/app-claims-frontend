/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, SelectWithSearch, TextField } from '@/core/components/ui'
import { FormProvider, useForm } from 'react-hook-form'
import { useEstablishment } from '../../establishments/hooks/requests/use-establishments'
import { useCategoriesClaim } from '../../categories_claim/hooks/requests/use-category-claim'
import { SearchIcon } from '@/core/components/icons'

interface ClaimsFilterFormProps {
  setFilters: (filters: any) => void
  filters: any
}

const ClaimsFilterForm = ({ setFilters }: ClaimsFilterFormProps) => {
  const form = useForm({})

  const resetFilters = () => {
    form.reset()
    setFilters({})
  }

  const { establishmentsToSelect, isLoading: establishmentIsLoading } =
    useEstablishment()
  const { categoriesClaimToSelect, isLoading: categoriesIsLoading } =
    useCategoriesClaim()


  const onSubmit = (data: any) => {
    setFilters(data)
  }
  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-4/5'>
          <Card title='Filtros' className='my-5'>
            <div className='flex flex-col gap-4'>
              {/* Primera fila */}
              <div className='grid grid-cols-3 gap-x-10'>
                <TextField
                  label='Código de reclamación'
                  inputName='claim_code'
                />

                <SelectWithSearch
                  inputName='state'
                  label='Estado'
                  options={[
                    { value: 'pendiente', label: 'Pendiente' },
                    { value: 'respondido', label: 'Resuelto' }
                  ]}
                />

                <SelectWithSearch
                  inputName='establishment_id'
                  label='Establecimiento'
                  options={establishmentsToSelect}
                  loading={establishmentIsLoading}
                />
              </div>

              {/* Segunda fila */}
              <div className='grid grid-cols-3 gap-x-10'>
                <SelectWithSearch
                  inputName='claim_type'
                  label='Tipo de reclamación'
                  options={[
                    { value: 'reclamo', label: 'Reclamo' },
                    { value: 'queja', label: 'Queja' }
                  ]}
                />

                <SelectWithSearch
                  inputName='category_id'
                  label='Categoría'
                  options={categoriesClaimToSelect}
                  loading={categoriesIsLoading}
                />
              </div>
            </div>

            <div className='flex justify-center mt-8 gap-12'>
              <Button
                type='submit'
                variant='primary'
                icon={<SearchIcon className='w-5' />}
              >
                Buscar
              </Button>
              <Button onClick={resetFilters} variant='secondary' type='button'>
                Resetear Filtros
              </Button>
            </div>
          </Card>
        </form>
      </FormProvider>
    </>
  )
}
export default ClaimsFilterForm
