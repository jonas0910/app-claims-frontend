import { useQuery } from '@tanstack/react-query'
import { getSelectionPageWithCompany } from '../../selection-pages/actions/selection-page'
import { SelectionPageWithCompany } from '../../selection-pages/types/selection-page'

export const useSelectionPageWithCompany = (
  link_selection_page: string,
  company_id: string
) => {
  const { data, isLoading } = useQuery<SelectionPageWithCompany | undefined>({
    queryKey: ['claim', 'selection-page', 'company', company_id],
    queryFn: async () => {
      const result = await getSelectionPageWithCompany(
        link_selection_page,
        company_id
      )
      return result.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!link_selection_page && !!company_id
  })

  return { selectionPageWithCompany: data, isLoading }
}
