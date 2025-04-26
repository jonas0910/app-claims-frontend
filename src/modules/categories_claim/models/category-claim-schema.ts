import { z } from 'zod'

export const categoryClaimSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  establishment_id: z.number().int().positive('El establecimiento es requerido').nullable()
})

export type CategoryClaimInputsType = z.infer<typeof categoryClaimSchema>
