import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@pheralb/toast'
import { updateNotificationEmail } from '../../actions/notification-email'
import { NotificationEmail, NotificationEmailPostPut } from '../../types/notification-email'

export const useUpdateNotificationEmail = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: updateNotificationEmailFn, isPending } = useMutation({
    mutationKey: ['claim', 'notification-email', 'update'],
    mutationFn: async ({
      data,
      id
    }: {
      data: NotificationEmailPostPut
      id: number
    }) => {
      return updateNotificationEmail(data, id)
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
      if (status === 201 || (status === 200 && success)) {
        toast.success({
          text: message,
          description: email
            ? `Correo de notificación ${email.email} actualizada correctamente! ✨`
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
  return { updateNotificationEmailFn, isPending }
}
