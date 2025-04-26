'use server'
import { Paginate } from '@/core/types/paginate'
import { axiosInstance } from '@/core/config/axios'
import { formatErrors } from '@/core/helpers/format-errors'
import { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { NotificationEmail, NotificationEmailGet, NotificationEmailPostPut } from '../types/notification-email'



interface ApiResponse<T> {
  success: boolean
  data: T
}

export const getAllNotificationEmails = async () => {
  const { data: results } = await axiosInstance.get('/notification-emails')
  const { data: emails } = results as ApiResponse<NotificationEmail[]>

  return emails
}

export const getAllNotificationEmailsWithParams = async (params: {
  [key: string]: any
}): Promise<Paginate<NotificationEmailGet[]>> => {
  const { data: results } = await axiosInstance.get('/notification-emails', {
    params
  })
  return results
}

export const createNotificationEmail = async (data: NotificationEmailPostPut) => {
  try {
    const { data: results, status } = await axiosInstance.post(
      '/notification-emails',
      data
    )
    const {
      data: email,
      message,
      success
    } = results as { success: boolean; data: NotificationEmail; message: string }
    return { message, email, status, success }
  } catch (error) {
    if (error instanceof AxiosError) {
      const formattedErrors = formatErrors(error.response?.data.errors)

      return {
        message: '',
        email: null,
        status: error.response?.status!,
        success: error.response?.data.success,
        errors: formattedErrors
      }
    }

    return {
      message: 'Error Interno del Servidor',
      email: null,
      status: 500,
      success: false
    }
  }
}

export const updateNotificationEmail = async (
  data: NotificationEmailPostPut,
  id: number
) => {
  try {
    const { data: results, status } = await axiosInstance.put(
      `/notification-emails/${id}`,
      data
    )

    const {
      data: email,
      message,
      success
    } = results as { data: NotificationEmail; message: string; success: boolean }

    return { message, email, status, success }
  } catch (error) {
    if (error instanceof AxiosError) {
      const formattedErrors = formatErrors(error.response?.data.errors)

      return {
        message: '',
        email: null,
        status: error.response?.status!,
        success: error.response?.data.success,
        errors: formattedErrors
      }
    }

    return {
      message: 'Error Interno del Servidor',
      email: null,
      status: 500,
      success: false
    }
  }
}

export const deleteNotificationEmail = async (id: number) => {
  try {
    const { data: results, status } = await axiosInstance.delete(
      `/notification-emails/${id}`
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

export const sendVerificationEmail = async (data: NotificationEmailPostPut) => {
  try {
    const { data: results, status } = await axiosInstance.post(
      '/send-verification',
      data
    )

    const { message, success } = results as { message: string; success: boolean }

    return { message, status, success }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        message: error.response?.data?.message ?? 'Error en la solicitud.',
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