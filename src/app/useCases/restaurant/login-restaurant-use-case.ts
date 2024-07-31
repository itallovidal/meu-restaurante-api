import { Injectable } from '@nestjs/common'
import { IContractorRepository } from '../../repositories/IContractorRepository'
import { loginDTO } from '../../../infra/validations/restaurant/login-validation'

@Injectable()
export class LoginRestaurantUseCase {
  constructor(private contractorRepository: IContractorRepository) {}

  async execute(data: loginDTO) {
    return await this.contractorRepository.login(data.email, data.password)
  }
}
