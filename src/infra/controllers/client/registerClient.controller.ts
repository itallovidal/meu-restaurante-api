import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common'
import { ZodValidationPipe } from '../../validations/zodValidationPipe'
import { firebaseIdCollection } from '../../validations/idCollectionValidation'
import {
  IRegisterClientDTO,
  registerClientSchemaDTO,
} from '../../validations/client/registerClientDTO'
import { RegisterClientUseCase } from '../../../app/useCases/client/registerClientUseCase'

@Controller('client')
export class RegisterClientController {
  constructor(private registerClientUseCase: RegisterClientUseCase) {}

  @Post('register/:collectionID')
  @HttpCode(201)
  async handle(
    @Param('collectionID', new ZodValidationPipe(firebaseIdCollection))
    collectionID: string,
    @Body(new ZodValidationPipe(registerClientSchemaDTO))
    payload: IRegisterClientDTO,
  ) {
    await this.registerClientUseCase.execute(collectionID, payload)
  }
}
