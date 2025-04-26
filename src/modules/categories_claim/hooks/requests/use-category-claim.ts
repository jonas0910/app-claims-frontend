import { useQuery } from '@tanstack/react-query'
import { getAllCategoriesClaim } from '../../actions/categories-claim'
import { CategoryClaim } from '../../types/categories-claim'

export const useCategoriesClaim = () => {
  const { data, isLoading } = useQuery<CategoryClaim[]>({
    queryKey: ['claim', 'categories-claim', 'all'],
    queryFn: () => {
      return getAllCategoriesClaim()
    },
    staleTime: 1000 * 60 * 5
  })

  const categoriesClaimToSelect = data?.map((category) => ({
    value: category.id,
    label: category.name
  }))

  return {
    providers: data,
    categoriesClaimToSelect,
    isLoading
  }
}
