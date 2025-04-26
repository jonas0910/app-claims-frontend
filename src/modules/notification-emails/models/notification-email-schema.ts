import { z } from 'zod'

export const notificationEmailSchema = z.object({
  email: z.string().min(1, 'El nombre es requerido'),
  establishment_id: z.number().positive('El establecimiento es requerido').nullable()
})

export type NotificationEmailInputsType = z.infer<typeof notificationEmailSchema>
