import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@pheralb/toast'
import { CategoryClaim, CategoryClaimPostPut } from '../../types/categories-claim'
import { updateCategoryClaim } from '../../actions/categories-claim'

export const useUpdateCategoryClaim = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: updateCategoryClaimFn, isPending } = useMutation({
    mutationKey: ['claim', 'category-claim', 'update'],
    mutationFn: async ({
      data,
      id
    }: {
      data: CategoryClaimPostPut
      id: number
    }) => {
      return updateCategoryClaim(data, id)
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
      if (status === 201 || (status === 200 && success)) {
        toast.success({
          text: message,
          description: category
            ? `Categoria ${category.name} actualizada correctamente! ✨`
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
        queryKey: ['claim', 'categories-claim', 'all']
      })
      queryClient.invalidateQueries({
        queryKey: ['table-data-category-claim-with-params']
      })
    }
  })
  return { updateCategoryClaimFn, isPending }
}
