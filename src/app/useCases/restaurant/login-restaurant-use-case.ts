import { Injectable } from '@nestjs/common'
import { IRestaurantRepository } from '../../repositories/IRestaurant-repository'
import { loginDTO } from '../../../infra/validations/restaurant/login-validation'

@Injectable()
export class LoginRestaurantUseCase {
  constructor(private contractorRepository: IRestaurantRepository) {}

  async execute(data: loginDTO) {
    return await this.contractorRepository.login(data.email, data.password)
  }
}
