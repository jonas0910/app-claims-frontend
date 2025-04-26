import { z } from 'zod'

export const selectionPageSchema = z.object({
  custom_link: z
    .string()
    .min(1, 'El link personalizado es requerido')
    .regex(
      /^[a-z0-9_-]+$/,
      'El link solo puede contener letras minúsculas, números, guiones medios y guiones bajos'
    ),
  brand_name: z.string().optional(),
  logo_url_edit: z.any().optional(),
  logo_url_create: z.any().optional(),
  establishments: z.array(z.number()).optional()
})

export type SelectionPageInputsType = z.infer<typeof selectionPageSchema>
