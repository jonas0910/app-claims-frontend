import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@pheralb/toast'
import { CategoryClaim, CategoryClaimPostPut } from '../../types/categories-claim'
import { createCategoryClaim } from '../../actions/categories-claim'

export const useCreateCategoryClaim = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: createCategoryClaimFn, isPending } = useMutation({
    mutationKey: ['claim', 'category-claim', 'create'],
    mutationFn: (data: CategoryClaimPostPut) => {
      return createCategoryClaim(data)
    },
    onSuccess: ({
      message,
      category,
      status,
      success,
      errors
    }: {
      message: string
      category: CategoryClaim | null
      status: number
      success: boolean
      errors?: { key: string; error: string }[]
    }) => {
      if (status === 201 && success) {
        toast.success({
          text: message,
          description: category
            ? `Categoria ${category.name} creada correctamente! ✨`
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
        queryKey: ['claim', 'categories', 'all']
      })
      queryClient.invalidateQueries({
        queryKey: ['table-data-category-claim-with-params']
      })
    }
  })
  return { createCategoryClaimFn, isPending }
}
