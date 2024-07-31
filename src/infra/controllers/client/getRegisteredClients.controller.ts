import { GetRegisteredClientsUseCase } from '../../../app/useCases/client/getRegisteredClientsUseCase'
import {
  Controller,
  Get, HttpCode,
  InternalServerErrorException,
  Param,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../validations/zodValidationPipe'
import {
  getRegisteredClientSchema,
  IGetRegisteredClientSchema,
} from '../../validations/client/getRegisteredClientValidation'

@Controller('client')
export class GetRegisteredClientsController {
  constructor(
    private getRegisteredClientsUseCase: GetRegisteredClientsUseCase,
  ) {}

  @Get('registered/:collectionID/:lastDoc')
  @HttpCode(200)
  async handle(
    @Param(new ZodValidationPipe(getRegisteredClientSchema))
    params: IGetRegisteredClientSchema,
  ) {
    const { collectionID, lastDoc } = params

    try {
      const docs = await this.getRegisteredClientsUseCase.execute(
        collectionID,
        lastDoc,
      )

      return {
        docs,
      }
    } catch (e) {
      console.log(e)

      throw new InternalServerErrorException('Erro ao cadastrar.', {
        description: 'Problema interno ao cadastrar.',
      })
    }
  }
}
