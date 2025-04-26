import { useMutation } from '@tanstack/react-query'
import { login } from '../actions/login'
import { Login, UserAuth } from '../types/login'
import { useAuthSessionStore } from '@/core/store/auth/auth-session-store'
import { toast } from '@pheralb/toast'

export const useLogin = () => {
  const { setLogin } = useAuthSessionStore()

  const { mutateAsync: loginFn, isPending } = useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: async (data: Login) => login(data),
    onSuccess: ({
      status,
      token,
      token_expires_at,
      user,
      message,
      success
    }: {
      message: string
      success: boolean
      token: string | null
      token_expires_at: string | null
      user: UserAuth | null
      status: number | undefined
    }) => {
      if (success && token && status === 200) {
        toast.success({
          text: message,
          description: `Bienvenido(a) ${user?.name}`,
          delayDuration: 5000
        })
        setLogin({ token, user: user!, token_expires_at})
        return
      }

      if (!success && !token && status === 401) {
        toast.warning({
          text: message,
          description: `Verifica que tus credenciales sean correctas!`,
          delayDuration: 5000
        })
        return
      }

      if (!success && !token && status === 500) {
        toast.error({
          text: message,
          description: `Comuniquese con los administradores del sistema!`,
          delayDuration: 5000
        })
        return
      }

      if (!success && !token && status === 502) {
        toast.error({
          text: message,
          description: `El servidor no está disponible`,
          delayDuration: 5000
        })
        return
      }
    }
  })

  return { loginFn, isPending }
}
