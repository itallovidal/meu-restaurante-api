import {
  BadRequestException,
  Controller,
  Get, HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../validations/zodValidationPipe'
import { firebaseIdCollection } from '../../validations/idCollectionValidation'
import { GetRegisteredCountUseCase } from '../../../app/useCases/client/getRegisteredCountUseCase'

@Controller('client')
export class GetRegisteredCountController {
  constructor(private getRegisteredCountUseCase: GetRegisteredCountUseCase) {}

  @Get('/count/:collectionID')
  @HttpCode(200)
  async handle(
    @Param('collectionID', new ZodValidationPipe(firebaseIdCollection))
    collectionID: string,
  ) {
    try {
      return await this.getRegisteredCountUseCase.execute(collectionID)
    } catch (e) {
      console.log(e)
      throw new NotFoundException('Contratante Não encontrado.', {
        description:
          'Não foi possível achar o contratante em questão. Você colocou o ID correto?',
      })
    }
  }
}
