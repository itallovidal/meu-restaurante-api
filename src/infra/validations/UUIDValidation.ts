import z from 'zod'

export const UUIDValidation = z
  .string({
    invalid_type_error: 'Por favor, forneça um UUID.',
    required_error: 'UUID necessário.',
  })
  .uuid('Estrutura do UUID fornecido errado.')
