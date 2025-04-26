import { useQuery } from '@tanstack/react-query'
import { getDocumentTypeById } from '@/core/actions/global/document-types'
import { _getDocumentTypeById } from '@/core/services/global/document-types'

export const useDocumentTypeById = (id: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'document-types', 'document-type_id', id],
    queryFn: () => _getDocumentTypeById({ id }),
    // staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!id
  })

  return { documentType: data, isLoading }
}
