import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@pheralb/toast'
import { createEstablishment } from '../../actions/establishment'
import { Establishment, EstablishmentPostPut } from '../../types/establishment'

export const useCreateEstablishment = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: createEstablishmentFn, isPending } = useMutation({
    mutationKey: ['claim', 'establishment', 'create'],
    mutationFn: (data: EstablishmentPostPut) => {
      return createEstablishment(data)
    },
    onSuccess: ({
      message,
      establishment,
      status,
      success,
      errors
    }: {
      message: string
      establishment: Establishment | null
      status: number
      success: boolean
      errors?: { key: string; error: string }[]
    }) => {
      if (status === 201 && success) {
        toast.success({
          text: message,
          description: establishment
            ? `Establecimiento ${establishment.name} creado correctamente! ✨`
            : '',
          theme: 'light',
          delayDuration: 7000
        })
      }

      if (status === 422 && !success) {
        errors?.forEach((err, index) => {
          setTimeout(() => {
            toast.warning({
              text: 'Advertencia',
              description: err.error,
              theme: 'light',
              delayDuration: 7000
            })
          }, index * 700)
        })
      }

      if (status === 500 && !success) {
        toast.error({
          text: message,
          description: 'Ocurrio un error, comuníquese con los administradores',
          theme: 'light',
          delayDuration: 7000
        })
      }

      queryClient.invalidateQueries({
        queryKey: ['claim', 'establishment', 'all']
      })
      queryClient.invalidateQueries({
        queryKey: ['table-data-establishments-with-params']
      })
    }
  })
  return { createEstablishmentFn, isPending }
}
