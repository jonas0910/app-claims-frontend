import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@pheralb/toast'
import { updateEstablishment } from '../../actions/establishment'
import { Establishment, EstablishmentPostPut } from '../../types/establishment'

export const useUpdateEstablishment = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: updateEstablishmentFn, isPending } = useMutation({
    mutationKey: ['claim', 'establishment', 'update'],
    mutationFn: async ({data,id}: {data:EstablishmentPostPut; id: number}) => {
      return updateEstablishment(data, id)
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
      if (status === 201 || status === 200 && success) {
        toast.success({
          text: message,
          description: establishment
            ? `Establecimiento ${establishment.name} actualizado correctamente! ✨`
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
  return { updateEstablishmentFn, isPending }
}
