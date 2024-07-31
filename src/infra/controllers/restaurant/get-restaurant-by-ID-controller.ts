import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UsePipes,
} from '@nestjs/common'
import { GetRestaurantByIDUseCase } from '../../../app/useCases/restaurant/get-restaurant-by-ID-use-case'
import { ZodValidationPipe } from '../../validations/zodValidationPipe'
import { UUIDValidation } from '../../validations/UUIDValidation'

@Controller('restaurant')
export class GetRestaurantByIDController {
  constructor(private getContractorByIDUseCase: GetRestaurantByIDUseCase) {}

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
