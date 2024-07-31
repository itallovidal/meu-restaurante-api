import { Injectable } from '@nestjs/common'
import { IRestaurantRepository } from '../../repositories/IRestaurant-repository'
import { loginDTO } from '../../../infra/validations/restaurant/login-validation'

@Injectable()
export class LoginRestaurantUseCase {
  constructor(private restaurantRepository: IRestaurantRepository) {}

  async execute(data: loginDTO) {
    const restaurant = await this.restaurantRepository.login(
      data.email,
      data.password,
    )

    return restaurant
  }
}
