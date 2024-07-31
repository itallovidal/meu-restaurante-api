import { UpdateContractorUseCase } from '../../../app/useCases/contractor/updateContractorUseCase'
import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Param,
  Put,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../validations/zodValidationPipe'
import {
  contractorSchemaDTO,
  IContractorSchemaDTO,
} from '../../validations/contractor/ContractorSchema'
import { strSchema } from '../../validations/contractor/genericValidator'

@Controller('contractor')
export class UpdateContractorController {
  constructor(private updateContractorUseCase: UpdateContractorUseCase) {}

  @Put('update/:id')
  @HttpCode(200)
  async handle(
    @Param('id', new ZodValidationPipe(strSchema)) id: string,
    @Body(new ZodValidationPipe(contractorSchemaDTO))
    body: IContractorSchemaDTO,
  ) {
    try {
      console.log(body)

      return await this.updateContractorUseCase.execute(body, id)
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
