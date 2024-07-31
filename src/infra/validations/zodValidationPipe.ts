import {
  PipeTransform,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      console.log('->')
      console.log(error)

      if (error instanceof ZodError) {
        throw new BadRequestException('Erro de Validação.', {
          description: error.issues[0].message,
        })
      }

      throw new InternalServerErrorException('Erro interno do servidor.')
    }
  }
}
