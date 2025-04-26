/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { Paginate } from '@/core/types/paginate'
import {
  CategoryClaim,
  CategoryClaimGet,
  CategoryClaimPostPut
} from '../types/categories-claim'
import { axiosInstance } from '@/core/config/axios'
import { formatErrors } from '@/core/helpers/format-errors'
import { AxiosError } from 'axios'

interface ApiResponse<T> {
  success: boolean
  data: T
}

export const getAllCategoriesClaim = async () => {
  const { data: results } = await axiosInstance.get('/category-claims')
  const { data: categories } = results as ApiResponse<CategoryClaim[]>

  return categories
}

export const getAllCategoriesClaimWithParams = async (params: {
  [key: string]: any
}): Promise<Paginate<CategoryClaimGet[]>> => {
  const { data: results } = await axiosInstance.get('/category-claims', {
    params
  })
  return results
}

export const createCategoryClaim = async (data: CategoryClaimPostPut) => {
  try {
    const { data: results, status } = await axiosInstance.post(
      '/category-claims',
      data
    )
    const {
      data: category,
      message,
      success
    } = results as { success: boolean; data: CategoryClaim; message: string }
    return { message, category, status, success }
  } catch (error) {
    if (error instanceof AxiosError) {
      const formattedErrors = formatErrors(error.response?.data.errors)

      return {
        message: '',
        category: null,
        status: error.response?.status,
        success: error.response?.data.success,
        errors: formattedErrors
      }
    }

    return {
      message: 'Error Interno del Servidor',
      category: null,
      status: 500,
      success: false
    }
  }
}

export const updateCategoryClaim = async (
  data: CategoryClaimPostPut,
  id: number
) => {
  try {
    const { data: results, status } = await axiosInstance.put(
      `/category-claims/${id}`,
      data
    )

    const {
      data: category,
      message,
      success
    } = results as { data: CategoryClaim; message: string; success: boolean }

    return { message, category, status, success }
  } catch (error) {
    if (error instanceof AxiosError) {
      const formattedErrors = formatErrors(error.response?.data.errors)

      return {
        message: '',
        category: null,
        status: error.response?.status,
        success: error.response?.data.success,
        errors: formattedErrors
      }
    }

    return {
      message: 'Error Interno del Servidor',
      category: null,
      status: 500,
      success: false
    }
  }
}

export const deleteCategoryClaim = async (id: number) => {
  try {
    const { data: results, status } = await axiosInstance.delete(
      `/category-claims/${id}`
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
        status: error.response?.status,
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
