import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@pheralb/toast'
import { NotificationEmail, NotificationEmailPostPut } from '../../types/notification-email'
import { createNotificationEmail } from '../../actions/notification-email'

export const useCreateNotificationEmail = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: createNotificationEmailFn, isPending } = useMutation({
    mutationKey: ['claim', 'notification-email', 'create'],
    mutationFn: (data: NotificationEmailPostPut) => {
      return createNotificationEmail(data)
    },
    onSuccess: ({
      message,
      email,
      status,
      success,
      errors
    }: {
      message: string
      email: NotificationEmail | null
      status: number
      success: boolean
      errors?: { key: string; error: string }[]
    }) => {
      if (status === 201 && success) {
        toast.success({
          text: message,
          description: email
            ? `Correo de notificación ${email.email} creado correctamente! ✨`
            : '',
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

      queryClient.invalidateQueries({
        queryKey: ['table-data-notification-email-with-params']
      })
    }
  })
  return { createNotificationEmailFn, isPending }
}
