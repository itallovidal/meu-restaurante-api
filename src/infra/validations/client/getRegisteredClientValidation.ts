import z from 'zod'

export const getRegisteredClientSchema = z.object({
  collectionID: z.string().min(15),
  lastDoc: z.coerce.number().min(0).optional().default(0),
})

export interface IGetRegisteredClientSchema
  extends z.infer<typeof getRegisteredClientSchema> {}
