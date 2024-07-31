import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UsePipes,
} from '@nestjs/common'
import { GetContractorByIDUseCase } from '../../../app/useCases/contractor/getContractorByIDUseCase'
import { ZodValidationPipe } from '../../validations/zodValidationPipe'
import { UUIDValidation } from '../../validations/UUIDValidation'

@Controller('contractor')
export class GetContractorByIDController {
  constructor(private getContractorByIDUseCase: GetContractorByIDUseCase) {}

  @Get('/:id')
  @UsePipes(new ZodValidationPipe(UUIDValidation))
  async handle(@Param('id') id: string) {
    try {
      return await this.getContractorByIDUseCase.execute(id)
    } catch (e) {
      throw new NotFoundException('Não encontrado.', {
        description: 'Usuário não encontrado no banco.',
      })
    }
  }
}
