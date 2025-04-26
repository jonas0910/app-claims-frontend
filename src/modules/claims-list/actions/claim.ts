'use server'
import { Paginate } from '@/core/types/paginate'
import { axiosInstance } from '@/core/config/axios'
import { formatErrors } from '@/core/helpers/format-errors'
import { AxiosError } from 'axios'
import { Claim, ClaimGet, ClaimPost, ClaimPut } from '../types/claim'




interface ApiResponse<T> {
  success: boolean
  data: T
}

export const getAllClaim = async () => {
  const { data: results } = await axiosInstance.get('/claims')
  const { data: claims } = results as ApiResponse<Claim[]>

  return claims
}

export const getAllClaimWithParams = async (params: {
  [key: string]: any
}): Promise<Paginate<ClaimGet[]>> => {
  const { data: results } = await axiosInstance.get('/claims', {
    params
  })
  return results
}

export const createClaim = async (data: ClaimPost) => {
  try {
    const { data: results, status } = await axiosInstance.post(
      '/claims',
      data
    )
    const {
      data: claim,
      message,
      success
    } = results as { success: boolean; data: Claim; message: string }
    return { message, claim, status, success }
  } catch (error) {
    if (error instanceof AxiosError) {
      const formattedErrors = formatErrors(error.response?.data.errors)

      return {
        message: '',
        claim: null,
        status: error.response?.status!,
        success: error.response?.data.success,
        errors: formattedErrors
      }
    }

    return {
      message: 'Error Interno del Servidor',
      claim: null,
      status: 500,
      success: false
    }
  }
}

export const updateClaim = async (
  data: ClaimPut,
  id: number
) => {
  try {
    const { data: results, status } = await axiosInstance.put(
      `/claims/${id}`,
      data
    )

    const {
      data: claim,
      message,
      success
    } = results as { data: Claim; message: string; success: boolean }

    return { message, claim, status, success }
  } catch (error) {
    if (error instanceof AxiosError) {
      const formattedErrors = formatErrors(error.response?.data.errors)

      return {
        message: '',
        claim: null,
        status: error.response?.status!,
        success: error.response?.data.success,
        errors: formattedErrors
      }
    }

    return {
      message: 'Error Interno del Servidor',
      claim: null,
      status: 500,
      success: false
    }
  }
}

export const deleteClaim = async (id: number) => {
  try {
    const { data: results, status } = await axiosInstance.delete(
      `/claims/${id}`
    )

    const { message, success } = results as {
      message: string
      success: boolean
    }

    return { message, status, success }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        message: '',
        status: error.response?.status!,
        success: error.response?.data.success
      }
    }

    return {
      message: 'Error Interno del Servidor',
      status: 500,
      success: false
    }
  }
}


export const getClaimByCode = async (code: string) => {
  const { data: results } = await axiosInstance.get(`/claim/${code}`)
  const { data: claim } = results as ApiResponse<ClaimGet>

  return claim
}