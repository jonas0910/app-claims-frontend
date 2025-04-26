'use server'

import { cookies } from 'next/headers'
import { axiosInstance } from '@/core/config/axios'
import { Login, LoginResponse } from '../types/login'
import { AxiosError } from 'axios'

export const login = async (data: Login) => {
  try {
    const { data: results, status } = await axiosInstance.post('/login', data)
    const { message, success, token, token_expires_at, user } = results as LoginResponse;
    (await cookies()).set('token', token, {
      secure: true,
      sameSite: 'strict',
      path: '/',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expira en 24 horas
      maxAge: 24 * 60 * 60, // 24 horas en segundos
      httpOnly: true
    });
    
    return { message, success, token, token_expires_at, user, status }
  } catch (error) {
    if (error instanceof AxiosError) {
      const { error: errorMessage } = error.response?.data as { error: string }

      return {
        message: errorMessage,
        success: false,
        token: null,
        token_expires_at: null,
        user: null,
        status: error.response?.status
      }
    }

    return {
      message: 'Internal Server Error',
      success: false,
      token: null,
      token_expires_at: null,
      user: null,
      status: 500
    }
  }
}
