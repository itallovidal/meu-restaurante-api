import z from 'zod'

export const restaurantSchema = z.object({
  email: z.string().toLowerCase(),
  id: z.string().uuid(),
  nome: z.string(),
  senha: z.string(),
  telefone: z.string(),
  mensagem_sucesso: z.string().default('Cadastrado com sucesso!'),
  siteInstitucional: z.string().or(z.null()).default(null),
  facebook: z.string().or(z.null()).default(null),
  youtube: z.string().or(z.null()).default(null),
  instagram: z.string().or(z.null()).default(null),
  whatsappCommunity: z.string().or(z.null()).default(null),
})

export const createRestaurantSchema = restaurantSchema.omit({
  id: true,
})

export interface ICreateRestaurantSchema
  extends z.infer<typeof createRestaurantSchema> {}

export interface IRestaurantSchema extends z.infer<typeof restaurantSchema> {}
