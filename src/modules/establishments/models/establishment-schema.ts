import { z } from 'zod';

export const establishmentSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido' ),
  custom_link: z.string()
  .min(1, 'El link personalizado es requerido' )
  .regex(/^[a-z0-9_-]+$/, 'El link solo puede contener letras minúsculas, números, guiones medios y guiones bajos'),
  type_address: z.number({ message: 'El tipo es requerido' }), // 1 = Local físico, 0 = Canal online
  zip_code: z.string().max(5, "El código postal no puede tener más de 5 caracteres").optional(),

  // Dirección
  address: z.string().optional(),
  department: z.string().optional(),
  province: z.string().optional(),
  district: z.string().optional(),

  // Página web (permite vacío si no es canal online)
  web_page: z.union([z.string().url({ message: "URL inválida" }), z.literal("")]).optional(),
  
}).superRefine((data, ctx) => {
  if (data.type_address === 1) { // Local físico
    if (!data.address) {
      ctx.addIssue({
        path: ["address"],
        message: "La dirección es requerida para un local físico",
        code: "custom",
      });
    }
    if (!data.department) {
      ctx.addIssue({
        path: ["department"],
        message: "El departamento es requerido para un local físico",
        code: "custom",
      });
    }
    if (!data.province) {
      ctx.addIssue({
        path: ["province"],
        message: "La provincia es requerida para un local físico",
        code: "custom",
      });
    }
    if (!data.district) {
      ctx.addIssue({
        path: ["district"],
        message: "El distrito es requerido para un local físico",
        code: "custom",
      });
    }
  }

  if (data.type_address === 0) { // Canal online
    if (!data.web_page || data.web_page === "") {
      ctx.addIssue({
        path: ["web_page"],
        message: "La página web es obligatoria para un canal online",
        code: "custom",
      });
    }
  }
});

export type EstablishmentInputsType = z.infer<typeof establishmentSchema>;
