import { z } from 'zod'

export const claimSchema = z
  .object({
    name: z.string().min(1, 'El nombre es requerido'),
    under_age: z.enum(['Si', 'No'], {
      message: 'Debe seleccionar una opción válida'
    }),
    parent_name: z.string().optional(),
    document_type: z.number().min(1, 'El tipo de documento es requerido'),
    document_number: z.string().min(1, 'El número de documento es requerido'),
    email: z.string().email('Debe ser un correo válido'),
    phone: z.string().min(6, 'Debe ingresar un teléfono válido'),
    type_asset: z.string().min(1, 'Debe seleccionar un tipo de bien'),
    description_asset: z.string().min(1, 'Debe ingresar una descripción'),
    claim_yesno: z.enum(['Si', 'No'], {
      message: 'Debe seleccionar una opción válida'
    }),
    currency_type: z.number().optional(),
    claim_mount: z.string().optional(),
    claim_type: z.string().min(1, 'Debe seleccionar un tipo de reclamo'),
    claim_text: z.string().min(1, 'Debe ingresar un detalle del reclamo'),
    request_text: z.string().min(1, 'Debe ingresar un pedido'),
    accept_terms: z.enum(['Si'], {
      required_error: 'Acepte el tratamiento de datos para enviar el reclamo.',
      message: 'Acepte el tratamiento de datos para enviar el reclamo.'
    })
  })
  .superRefine((data, ctx) => {
    // Validación condicional para parent_name cuando under_age es "Si"
    if (data.under_age === 'Si' && (!data.parent_name || data.parent_name.trim() === '')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El nombre del padre/tutor es requerido para menores de edad',
        path: ['parent_name']
      });
    }

    // Validación condicional para currency_type y claim_mount cuando claim_yesno es "Si"
    if (data.claim_yesno === 'Si') {
      if (!data.currency_type ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'El tipo de moneda es requerido cuando se indica un monto de reclamo',
          path: ['currency_type']
        });
      }

      if (!data.claim_mount || data.claim_mount.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'El monto de reclamo es requerido',
          path: ['claim_mount']
        });
      }
    }
  });

export type ClaimInputsType = z.infer<typeof claimSchema>