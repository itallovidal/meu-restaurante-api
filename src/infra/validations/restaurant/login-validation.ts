import z from 'zod'

export const loginSchemaDTO = z.object({
  email: z
    .string({
      required_error: 'Campo de email é obrigatório.',
    })
    .email('O email não está em um formato válido.'),
  password: z.string({
    required_error: 'Campo de senha é obrigatório.',
  }),
})

export interface loginDTO extends z.infer<typeof loginSchemaDTO> {}
