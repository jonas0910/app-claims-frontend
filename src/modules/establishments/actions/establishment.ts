'use server'

import { axiosInstance } from '@/core/config/axios'
import { Paginate } from '@/core/types/paginate'
import {
  Establishment,
  EstablishmentGet,
  EstablishmentPostPut
} from '../types/establishment'
import { AxiosError } from 'axios'
import { formatErrors } from '@/core/helpers/format-errors'

interface ApiResponse<T> {
  success: boolean
  data: T
}

export const getAllEstablishments = async () => {
  const { data: results } = await axiosInstance.get('/establishments')
  const { data: establishments } = results as ApiResponse<Establishment[]>
  return establishments
}
export const getAllEstablishmentWithParams = async (params: {
  [key: string]: any
}): Promise<Paginate<EstablishmentGet[]>> => {
  const { data: results } = await axiosInstance.get('/establishments', {
    params
  })
  return results
}

export const createEstablishment = async (data: EstablishmentPostPut) => {
  try {
    const { data: results, status } = await axiosInstance.post(
      '/establishments',
      data
    )
    const {
      data: establishment,
      message,
      success
    } = results as { success: boolean; data: Establishment; message: string }
    return { message, establishment, status, success }
  } catch (error) {
    if (error instanceof AxiosError) {
      const formattedErrors = formatErrors(error.response?.data.errors)

      return {
        message: '',
        establishment: null,
        status: error.response?.status!,
        success: error.response?.data.success,
        errors: formattedErrors
      }
    }

    return {
      message: 'Error Interno del Servidor',
      establishment: null,
      status: 500,
      success: false
    }
  }
}

export const updateEstablishment = async (
  data: EstablishmentPostPut,
  id: number
) => {
  try {
    const { data: results, status } = await axiosInstance.put(
      `/establishments/${id}`,
      data
    )

    const {
      data: establishment,
      message,
      success
    } = results as { data: Establishment; message: string; success: boolean }

    return { message, establishment, status, success }
  } catch (error) {
    if (error instanceof AxiosError) {
      const formattedErrors = formatErrors(error.response?.data.errors)

      return {
        message: '',
        establishment: null,
        status: error.response?.status!,
        success: error.response?.data.success,
        errors: formattedErrors
      }
    }

    return {
      message: 'Error Interno del Servidor',
      establishment: null,
      status: 500,
      success: false
    }
  }
}

export const getEstablishmentWithCompany = async (
  link_establishment: string,
  company_id: string
) => {
  try {
    const { data: results, status } = await axiosInstance.get(
      `/establishments/${link_establishment}/${company_id}`
    )
    return { data: results, status }
  } catch (error) {
    if (error instanceof AxiosError) {
      const formattedErrors = formatErrors(error.response?.data.errors)

      return {
        message: '',
        establishment: null,
        status: error.response?.status!,
        success: error.response?.data.success,
        errors: formattedErrors
      }
    }

    return {
      message: 'Error Interno del Servidor',
      establishment: null,
      status: 500,
      success: false
    }
  }
}
