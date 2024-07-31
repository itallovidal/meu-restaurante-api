import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { IContractorRepository } from '../../repositories/IContractorRepository'
import { ICreateRestaurantSchemaDTO } from '../../../infra/validations/restaurant/restaurant-schema'
import { createQrCode } from '../../../libraries/createQRCode'

@Injectable()
export class CreateRestaurantUseCase {
  constructor(private contractorRepository: IContractorRepository) {}

  async execute(
    data: ICreateRestaurantSchemaDTO,
    profile_image: Express.Multer.File,
  ) {
    try {
      const id = crypto.randomUUID()

      const { qrCodeURL, URL } = await createQrCode(id)

      const profileImagePath = await this.contractorRepository.storeFile(
        profile_image,
        id,
      )

      const { partido_nome, partido_sigla, ...filteredData } = data

      const contractor = {
        ...filteredData,
        id,
        profile_image: profileImagePath,
        URLCadastro: URL,
        qrCode_image: qrCodeURL,
        partido: {
          partido_nome: partido_sigla,
          partido_sigla: partido_nome,
        },
      }

      return await this.contractorRepository.create(contractor)
    } catch (e) {
      throw new InternalServerErrorException('Erro ao criar o contratante.')
    }
  }
}
