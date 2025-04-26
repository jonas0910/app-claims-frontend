import { useQuery } from '@tanstack/react-query'
import { Establishment } from '../../types/establishment'
import { getAllEstablishments } from '../../actions/establishment'

export const useEstablishment = () => {
  const { data, isLoading } = useQuery<Establishment[]>({
    queryKey: ['claim', 'establishment', 'all'],
    queryFn: () => {
      return getAllEstablishments()
    },
    staleTime: 1000 * 60 * 5
  })

  const establishmentsToSelect = data?.map((category) => ({
    value: category.id,
    label: category.name
  }))

  return {
    establishments: data,
    establishmentsToSelect,
    isLoading
  }
}
