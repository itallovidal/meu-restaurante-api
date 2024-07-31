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
  createContractorSchemaDTO,
  ICreateContractorSchemaDTO,
} from '../../validations/contractor/ContractorSchema'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateContractorUseCase } from '../../../app/useCases/contractor/createContractorUseCase'
import multer = require('multer')
import { ZodValidationPipe } from '../../validations/zodValidationPipe'

@Controller('contractor')
export class CreateContractorController {
  constructor(private createContractorUseCase: CreateContractorUseCase) {}

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
    @Body(new ZodValidationPipe(createContractorSchemaDTO))
    body: ICreateContractorSchemaDTO,
    @UploadedFile() profile_image: Express.Multer.File,
  ) {
    try {
      const newUser = await this.createContractorUseCase.execute(
        body,
        profile_image,
      )

      return {
        message: 'Usuário Criado Com Sucesso.',
        statusCode: 201,
        userCreated: newUser,
      }
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException('deu algo errado.')
    }
  }
}
