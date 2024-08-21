import { ExportClientsToCsvUseCase } from '../../../app/useCases/client/ExportClientsToCsvUseCase'
import { Controller, Get, Header, HttpCode, Param } from '@nestjs/common'
import { ZodValidationPipe } from '../../validations/zodValidationPipe'
import { firebaseIdCollection } from '../../validations/idCollectionValidation'

@Controller('client')
export class ExportClientsToCSVController {
  constructor(private exportClientsToCsvUseCase: ExportClientsToCsvUseCase) {}

  @Get('export/:collectionID')
  @HttpCode(200)
  @Header('Content-Type', 'text/csv')
  async handle(
    @Param('collectionID', new ZodValidationPipe(firebaseIdCollection))
    collectionID: string,
  ) {
    try {
      return await this.exportClientsToCsvUseCase.execute(collectionID)
    } catch (e) {
      console.log(e)
    }
  }
}
