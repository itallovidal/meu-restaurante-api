import z from 'zod'

export const strSchema = z.string({
  required_error: 'O id precisa ser uma string.',
  invalid_type_error: 'O valor precisa ser do tipo string.',
})

export type IStrSchema = typeof strSchema
