import { SearchIcon } from '@/core/components/icons'
import { Button, Card, CardHideDivider, SelectWithSearch, TextField } from '@/core/components/ui'
import { FormProvider, useForm } from 'react-hook-form'

interface EstablishmentFilterFormProps {
  setFilters: (filters: any) => void
  filters: any
}

const EstablishmentFilterForm = ({
  setFilters,
  filters
}: EstablishmentFilterFormProps) => {
  const form = useForm({})

  const resetFilters = () => {
    form.reset()
    setFilters({})
  }
  console.log('filters', filters)

  const onSubmit = (data: any) => {
    console.log('data', data)
    setFilters(data)
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-1/2'>
        <CardHideDivider title='¿Estas buscando un establecimiento?'  >
          <div className='flex flex-row gap-12 mb-5 justify-center'>
            {/* <SearchField
              inputName='name'
              label='Buscar por Nombre'
              captureValue={captureValue}
            /> */}
            <TextField label='Nombre' inputName='name' />

            <SelectWithSearch
              label='Tipo de dirección'
              inputName='type_address'
              options={[
                { value: 'Online', label: 'Canal Online' },
                { value: 'Fisico', label: 'Local Físico' }
              ]}
            />
          </div>
          <div className='flex justify-center mt-8 gap-12'>
            <Button type='submit' variant='primary' icon={<SearchIcon className='w-5' />}>
              Buscar
            </Button>
            <Button onClick={resetFilters} variant='secondary' type='button'>
              Resetear Filtros
            </Button>
          </div>
        </CardHideDivider>
      </form>
    </FormProvider>
  )
}

export default EstablishmentFilterForm
