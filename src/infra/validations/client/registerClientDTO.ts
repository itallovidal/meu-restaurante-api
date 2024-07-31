import z from 'zod'

const emailValidation = z.string().email()

export const registerClientSchemaDTO = z.object({
  nome: z.string().min(3, { message: 'Mínimo de 3 caracteres.' }),
  sobrenome: z.string().min(3, { message: 'Mínimo de 3 caracteres.' }),
  data_nascimento: z.string(),
  email: z.string().refine(
    (a) => {
      if (a === '') return true
      const validation = emailValidation.safeParse(a)
      return validation.success
    },
    {
      message: 'OBS.: O email deve conter @ + email + .com',
    },
  ),
  telefone: z.string().nonempty({ message: 'Digite o número de celular.' }),

  endereco: z.object({
    cep: z.string().or(z.null()).default(null),
    bairro: z.string().min(4, {
      message: 'Bairro muito pequeno. Mínimo de 4 caracteres.',
    }),
    rua: z.string().or(z.null()).default(null),
    uf: z
      .string({
        required_error: 'Escreva a UF',
      })
      .min(2, { message: 'Mínimo de 2 caracteres.' })
      .max(2, { message: 'Máximo de 2 caracteres.' }),
    cidade: z.string().nonempty({ message: 'Por favor, coloque a cidade.' }),
  }),
})

export interface IRegisterClientDTO
  extends z.infer<typeof registerClientSchemaDTO> {}
