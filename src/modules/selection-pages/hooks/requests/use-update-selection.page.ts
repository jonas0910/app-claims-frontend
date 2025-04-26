import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@pheralb/toast'
import { SelectionPage } from '../../types/selection-page'
import { updateSelectionPage } from '../../actions/selection-page'

export const useUpdateSelectionPage = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: updateSelectionPageFn, isPending } = useMutation({
    mutationKey: ['claim', 'selection-page', 'update'],
    mutationFn: async ({ data, id }: { data: FormData; id: number}) => {
      return updateSelectionPage(data, id)
    },

    onSuccess: ({
      message,
      page,
      status,
      success,
      errors
    }: {
      message: string
      page: SelectionPage | null
      status: number | undefined
      success: boolean
      errors?: { key: string; error: string }[] | undefined
    }) => {
      if (status === 201 || (status === 200 && success)) {
        toast.success({
          text: message,
          description: page
            ? `Página de selección actualizada correctamente! ✨`
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
        queryKey: ['claim', 'selection-page', 'all']
      })
      queryClient.invalidateQueries({
        queryKey: ['table-data-selection-page-with-params']
      })
    }
  })
  return { updateSelectionPageFn, isPending }
}
