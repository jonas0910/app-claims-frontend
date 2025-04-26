import { useQuery } from '@tanstack/react-query'
import { ClaimGet } from '../types/claim'
import { getAllClaimWithParams } from '../actions/claim'

export const useClaim = (filters: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ['claim', 'claims-list', filters], // Se reactiva cuando cambian los filtros
    queryFn: () => getAllClaimWithParams(filters), // Usamos la función con filtros
    staleTime: 1000 * 60 * 5
  })

  const totalClaims = data?.data?.length || 0
  const totalClaimsPending = data?.data?.filter(
    (claim) => claim.state === 'pendiente'
  ).length || 0
  const totalClaimsAnswered = data?.data?.filter(
    (claim) => claim.state === 'respondido'
  ).length || 0

  return {
    claims: data?.data || [],
    totalClaims,
    totalClaimsPending,
    totalClaimsAnswered,
    isLoading
  }
}
