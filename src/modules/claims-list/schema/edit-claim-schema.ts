import { z } from 'zod'

export const editClaimSchema = z.object({
  answer: z.string().nullable(),
  email_contact_date: z.string().nullable(),
  phone_contact_date: z.string().nullable(),
  internal_notes: z.string().nullable(),
  categories: z.array(z.number())
})

export type EditClaimInputsType = z.infer<typeof editClaimSchema>
