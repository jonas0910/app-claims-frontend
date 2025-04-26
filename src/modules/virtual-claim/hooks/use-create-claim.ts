import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@pheralb/toast'
import { Claim, ClaimPost } from '../../claims-list/types/claim'
import { createClaim } from '../../claims-list/actions/claim'

export const useCreateClaim = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: createClaimFn, isPending } = useMutation({
    mutationKey: ['claim', 'claims-list', 'create'],
    mutationFn: (data: ClaimPost) => {
      return createClaim(data)
    },
    onSuccess: ({
      message,
      claim,
      status,
      success,
      errors
    }: {
      message: string
      claim: Claim | null
      status: number
      success: boolean
      errors?: { key: string; error: string }[]
    }) => {
      if (status === 201 && success) {
        toast.success({
          text: message,
          description: claim
            ? `Reclamo enviado correctamente! ✨`
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
        queryKey: ['claim', 'claims-list', 'all']
      })
      queryClient.invalidateQueries({
        queryKey: ['table-data-claims-list-with-params']
      })
    }
  })
  return { createClaimFn, isPending }
}
