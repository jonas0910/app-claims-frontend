import { axiosInstance } from '@/core/config/axios'
import { DocumentTypes } from '@/core/types/global/document-types'

interface ApiResponse<T> {
  success: boolean
  data: T
}

export const _getAllDocumentTypes = async () => {
  const { data: results } = await axiosInstance.get('/document-types')
  const { data: documentTypes } = results as ApiResponse<DocumentTypes[]>
  return documentTypes
}

export const _getDocumentTypeById = async ({ id }: { id: number }) => {
  if (!id) return {} as DocumentTypes

  const { data: documentType } = await axiosInstance.get(`/document-types/${id}`)
  return documentType as DocumentTypes
}
