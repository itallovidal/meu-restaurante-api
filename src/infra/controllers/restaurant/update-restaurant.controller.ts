import { UpdateRestaurantUseCase } from '../../../app/useCases/restaurant/update-restaurant-use-case'
import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common'
import { ZodValidationPipe } from '../../validations/zodValidationPipe'
import {
  restaurantSchema,
  IRestaurantSchema,
} from '../../validations/restaurant/restaurant-schema'
import { strSchema } from '../../validations/restaurant/generic-validator'

@Controller('restaurant')
export class UpdateRestaurantController {
  constructor(private updateContractorUseCase: UpdateRestaurantUseCase) {}

  @Put('update/:id')
  @HttpCode(200)
  async handle(
    @Param('id', new ZodValidationPipe(strSchema)) id: string,
    @Body(new ZodValidationPipe(restaurantSchema))
    body: IRestaurantSchema,
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
