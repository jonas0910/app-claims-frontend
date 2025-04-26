import { getEstablishmentWithCompany } from '@/modules/establishments/actions/establishment'
import { EstablishmentWithCompany } from '@/modules/establishments/types/establishment'
import { useQuery } from '@tanstack/react-query'

export const useEstablishmentWithCompany = (
  link_establishment: string,
  company_id: string
) => {
  const { data, isLoading } = useQuery<EstablishmentWithCompany | undefined>({
    queryKey: ['claim', 'establishment', 'supplier_owner', company_id],
    queryFn: async () => {
      const result = await getEstablishmentWithCompany(
        link_establishment,
        company_id
      )
      return result.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!link_establishment && !!company_id
  })

  return { establishmentWithCompany: data, isLoading }
}
