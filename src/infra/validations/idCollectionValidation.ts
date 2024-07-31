import z from 'zod'

export const firebaseIdCollection = z
  .string({
    invalid_type_error: 'O id precisa ser uma string',
  })
  .min(15, {
    message: 'O ID da coleção precisa ter 15 caracteres.',
  })
