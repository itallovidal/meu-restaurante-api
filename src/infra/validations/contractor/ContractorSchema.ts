import z from 'zod'

const partidoSchema = z.object({
  partido_nome: z.string().or(z.null()).optional().default(null),
  partido_sigla: z.string().or(z.null()).optional().default(null),
})

export const contractorSchemaDTO = z.object({
  email: z.string().toLowerCase(),
  id: z.string().uuid().optional(),
  nome: z.string(),
  senha: z.string(),
  telefone: z.string(),
  partido: partidoSchema,
  mensagem_sucesso: z.string().default('Cadastrado com sucesso!'),
  siteInstitucional: z.string().or(z.null()).default(null),
  facebook: z.string().or(z.null()).default(null),
  linkedin: z.string().or(z.null()).default(null),
  youtube: z.string().or(z.null()).default(null),
  instagram: z.string().or(z.null()).default(null),
  whatsappCommunity: z.string().or(z.null()).default(null),
})

export const createContractorSchemaDTO = contractorSchemaDTO
  .omit({
    partido: true,
  })
  .merge(
    z.object({
      partido_nome: z.string(),
      partido_sigla: z.string(),
    }),
  )

export interface ICreateContractorSchemaDTO
  extends z.infer<typeof createContractorSchemaDTO> {}

export interface IContractorSchemaDTO
  extends z.infer<typeof contractorSchemaDTO> {}
