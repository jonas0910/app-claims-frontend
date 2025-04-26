import { useQuery } from '@tanstack/react-query'
import { getClaimByCode } from '../../claims-list/actions/claim'
import { ClaimGet } from '../../claims-list/types/claim'

export const useClaimByCode = (code: string) => {
  const { data, isLoading } = useQuery<ClaimGet>({
    queryKey: ['claim', 'claim-by-code', code],
    queryFn: () => {
      return getClaimByCode(code)
    },
    staleTime: 1000 * 60 * 5
  })

  return {
    claim: data,
    isLoading
  }
}
