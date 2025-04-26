import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@pheralb/toast'
import { sendVerificationEmail, updateNotificationEmail } from '../../actions/notification-email'
import { NotificationEmail, NotificationEmailPostPut } from '../../types/notification-email'

export const useSendVerificationEmail = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: sendVerificationEmailFn, isPending } = useMutation({
    mutationKey: ['claim', 'verification-email', 'send'],
    mutationFn: async (data: NotificationEmailPostPut) => {
      return sendVerificationEmail(data)
    },

    onSuccess: ({
      message,
      status,
      success,
      errors
    }: {
      message: string
      status: number
      success: boolean
      errors?: { key: string; error: string }[]
    }) => {
      if (status === 201 || (status === 200 && success)) {
        toast.success({
          text: message,
          description: 'Correo de verificación enviado correctamente! ✨',
          theme: 'light',
          delayDuration: 7000
        })
      }

      if (status === 422 && !success) {
        errors?.forEach((err, index) => {
          setTimeout(() => {
            toast.warning({
              text: 'Advertencia',
              description: err.error,
              theme: 'light',
              delayDuration: 7000
            })
          }, index * 700)
        })
      }

      if (status === 500 && !success) {
        toast.error({
          text: message,
          description: 'Ocurrio un error, comuníquese con los administradores',
          theme: 'light',
          delayDuration: 7000
        })
      }
    }
  })
  return { sendVerificationEmailFn, isPending }
}
