import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../validations/zodValidationPipe'
import {
  loginSchemaDTO,
  loginDTO,
} from '../../validations/restaurant/login-validation'
import { LoginRestaurantUseCase } from '../../../app/useCases/restaurant/login-restaurant-use-case'

@Controller('restaurant')
export class LoginController {
  constructor(private loginContractorUseCase: LoginRestaurantUseCase) {}

  @Post('/login')
  @UsePipes(new ZodValidationPipe(loginSchemaDTO))
  @HttpCode(200)
  async handle(@Body() body: loginDTO) {
    try {
      return await this.loginContractorUseCase.execute(body)
    } catch (e) {
      throw new NotFoundException('Não encontrado.', {
        description: 'O login informado não bate com nenhum usuário existente.',
      })
    }
  }
}
