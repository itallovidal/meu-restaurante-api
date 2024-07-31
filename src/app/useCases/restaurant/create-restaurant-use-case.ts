import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { IRestaurantRepository } from '../../repositories/IRestaurant-repository'
import { ICreateRestaurantSchema } from '../../../infra/validations/restaurant/restaurant-schema'
import { createQrCode } from '../../../libraries/createQRCode'

@Injectable()
export class CreateRestaurantUseCase {
  constructor(private restaurantRepository: IRestaurantRepository) {}

  async execute(
    data: ICreateRestaurantSchema,
    profile_image: Express.Multer.File,
  ) {
    try {
      const id = crypto.randomUUID()
      const { qrCodeURL, URL } = await createQrCode(id)
      const profileImagePath = await this.restaurantRepository.storeFile(
        profile_image,
        id,
      )

      console.log('')

      const restaurant = {
        ...data,
        id,
        profile_image: profileImagePath,
        URLCadastro: URL,
        qrCode_image: qrCodeURL,
      }

      console.log('registrando no firebase..')

      return await this.restaurantRepository.create(restaurant)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException('Erro ao cadastrar restaurante.')
    }
  }
}
