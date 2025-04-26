'use server'

import { axiosInstance } from '@/core/config/axios'
import { DocumentTypes } from '@/core/types/global/document-types'

export const getAllDocumentTypes = async () => {
  const { data: results } = await axiosInstance.get('/document-types')
  const { data: documentTypes } = results as {
    data: DocumentTypes[]
    success: boolean
  }
  return documentTypes
}

export const getDocumentTypeById = async ({ id }: { id: number }) => {
  if (!id) {
    return {} as DocumentTypes
  }

  const { data: documentType } = await axiosInstance.get(
    `/document-types/${id}`
  )
  return documentType as DocumentTypes
}
