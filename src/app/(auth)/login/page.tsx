'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import LoginForm from '@/modules/auth/login/components/login-form'
import { useAuthSessionStore } from '@/core/store/auth/auth-session-store'

const LoginPage = () => {
  const router = useRouter()
  const { isAuth } = useAuthSessionStore()

  useEffect(() => {
    if (isAuth) {
      router.push('/claims-list')
    }
  }, [isAuth, router])

  if (isAuth) {
    return null
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-md text-center mb-6 space-y-2">
        <h1 className="text-white text-3xl font-bold tracking-tight">Bienvenido</h1>
        <p className="text-gray-300 text-base">Ingresa tus credenciales para continuar</p>
        <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-2"></div>
      </div>
      <LoginForm />
    </div>
  )
}

export default LoginPage