import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@pheralb/toast'
import { SelectionPage } from '../../types/selection-page'
import { createSelectionPage } from '../../actions/selection-page'

export const useCreateSelectionPage = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: createSelectionPageFn, isPending } = useMutation({
    mutationKey: ['claim', 'selection-page', 'create'],
    mutationFn: (data: FormData) => {
      return createSelectionPage(data)
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
      status: number
      success: boolean
      errors?: { key: string; error: string }[]
    }) => {
      if (status === 201 && success) {
        toast.success({
          text: message,
          description: page
            ? `Página de selección creada correctamente! ✨`
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
        queryKey: ['claim', 'selection-pages', 'all']
      })
      queryClient.invalidateQueries({
        queryKey: ['table-data-selection-page-with-params']
      })
    }
  })
  return { createSelectionPageFn, isPending }
}
