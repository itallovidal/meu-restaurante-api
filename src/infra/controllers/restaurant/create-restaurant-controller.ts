import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import {
  createRestaurantSchema,
  ICreateRestaurantSchema,
} from '../../validations/restaurant/restaurant-schema'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateRestaurantUseCase } from '../../../app/useCases/restaurant/create-restaurant-use-case'
import multer = require('multer')
import { ZodValidationPipe } from '../../validations/zodValidationPipe'

@Controller('restaurant')
export class CreateRestaurantController {
  constructor(private createContractorUseCase: CreateRestaurantUseCase) {}

  @HttpCode(201)
  @Post('/create')
  @UseInterceptors(
    FileInterceptor('profile_image', {
      dest: 'uploads/',
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
  async handle(
    @Body(new ZodValidationPipe(createRestaurantSchema))
    body: ICreateRestaurantSchema,
    @UploadedFile() profile_image: Express.Multer.File,
  ) {
    try {
      console.log('criando restaurante.')

      const restaurantCreated = await this.createContractorUseCase.execute(
        body,
        profile_image,
      )

      return {
        message: 'Restaurante Criado Com Sucesso.',
        statusCode: 201,
        restaurant: restaurantCreated,
      }
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException('deu algo errado.')
    }
  }
}
