'use server'

import {
  SelectionPage,
  SelectionPageGet,
} from '../types/selection-page'
import { AxiosError } from 'axios'
import { formatErrors } from '@/core/helpers/format-errors'
import { axiosInstance } from '@/core/config/axios'
import { Paginate } from '@/core/types/paginate'



export const getAllSelectionPagesWithParams = async (params: {
  [key: string]: unknown
}): Promise<Paginate<SelectionPageGet[]>> => {
  const { data: results } = await axiosInstance.get('/selection-pages', {
    params
  })
  return results
}

export const createSelectionPage = async (data: FormData) => {

  try {
    const { data: results, status } = await axiosInstance.post(
      '/selection-pages',
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
    const {
      data: page,
      message,
      success
    } = results as { success: boolean; data: SelectionPage; message: string }
    return { message, page, status, success }
  } catch (error) {
    if (error instanceof AxiosError) {
      const formattedErrors = formatErrors(error.response?.data.errors)

      return {
        message: '',
        page: null,
        status: error.response?.status,
        success: error.response?.data.success,
        errors: formattedErrors
      }
    }

    return {
      message: 'Error Interno del Servidor',
      page: null,
      status: 500,
      success: false
    }
  }
}

export const updateSelectionPage = async (data: FormData, id: number) => {
  data.append('_method', 'PUT')
  try {
    const { data: results, status } = await axiosInstance.post(
      `/selection-pages/${id}`,
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )

    const {
      data: page,
      message,
      success
    } = results as { data: SelectionPage | null; message: string; success: boolean }

    return { message, page, status, success }
  } catch (error) {
    if (error instanceof AxiosError) {
      const formattedErrors = formatErrors(error.response?.data.errors)

      return {
        message: '',
        page: null,
        status: error.response?.status,
        success: error.response?.data.success,
        errors: formattedErrors
      }
    }

    return {
      message: 'Error Interno del Servidor',
      page: null,
      status: 500,
      success: false
    }
  }
}

export const getSelectionPageWithCompany = async (
  link_selection_page: string,
  company_id: string
) => {
  try {
    const { data: results, status } = await axiosInstance.get(
      `/selection-pages/${link_selection_page}/${company_id}`
    )
    return { data: results, status }
  } catch (error) {
    if (error instanceof AxiosError) {
      const formattedErrors = formatErrors(error.response?.data.errors)

      return {
        message: '',
        page: null,
        status: error.response?.status,
        success: error.response?.data.success,
        errors: formattedErrors
      }
    }

    return {
      message: 'Error Interno del Servidor',
      page: null,
      status: 500,
      success: false
    }
  }
}
