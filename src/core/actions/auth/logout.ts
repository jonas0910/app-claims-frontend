'use server'

import { cookies } from 'next/headers'
import { axiosInstance } from '@/core/config/axios'
import { AxiosError } from 'axios'
import { UserAuth } from '@/modules/auth/login/types/login'

interface LogoutResponse {
    message: string
    success: boolean
    token: string 
    user: UserAuth
}

export const logout = async () => {
  try {
    const { data: results, status } = await axiosInstance.post('/logout')
    const { message, success, token, user } = results as LogoutResponse;
    (await cookies()).set('token', token, {
      secure: true,
      sameSite: 'strict',
      path: '/',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expira en 24 horas
      maxAge: 24 * 60 * 60, // 24 horas en segundos
      httpOnly: true
    });
    
    return { message, success, token, user, status }
  } catch (error) {
    if (error instanceof AxiosError) {
      const { error: errorMessage } = error.response?.data as { error: string }

      return {
        message: errorMessage,
        success: false,
        token: null,
        user: null,
        status: error.response?.status
      }
    }

    return {
      message: 'Internal Server Error',
      success: false,
      token: null,
      user: null,
      status: 500
    }
  }
}
