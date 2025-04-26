import { useQuery } from '@tanstack/react-query'
import { DocumentTypes } from '@/core/types/global/document-types'
import { getAllDocumentTypes } from '@/core/actions/global/document-types'
import { _getAllDocumentTypes } from '@/core/services/global/document-types'

export const useDocumentTypes = () => {
  const { data, isLoading } = useQuery<DocumentTypes[]>({
    queryKey: ['admin', 'document-types', 'all'],
    // queryFn: () => getAllDocumentTypes()
    queryFn: _getAllDocumentTypes,
    staleTime: 1000 * 60 * 5 // 5 minutos
  })

  const documentTypesToSelect = data?.map((documenttypes) => {
    return {
      label: documenttypes.abreviation,
      value: documenttypes.id
    }
  })

  const documentTypesPassportCarnetToSelect = data
    ?.filter(
      (docType) =>
        docType.name === 'Pasaporte' || docType.name === 'Carnet de Extranjeria'
    )
    .map((docType) => {
      return {
        label: docType.abreviation,
        value: docType.id
      }
    })

  return {
    documentTypesToSelect,
    isLoading,
    documenttypes: data,
    documentTypesPassportCarnetToSelect
  }
}
