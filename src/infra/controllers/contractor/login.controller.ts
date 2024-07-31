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
} from '../../validations/contractor/loginValidation'
import { LoginContractorUseCase } from '../../../app/useCases/contractor/loginContractorUseCase'

@Controller('contractor')
export class LoginController {
  constructor(private loginContractorUseCase: LoginContractorUseCase) {}

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
