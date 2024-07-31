import { Injectable } from '@nestjs/common'
import { IContractorRepository } from '../../repositories/IContractorRepository'
import { loginDTO } from '../../../infra/validations/contractor/loginValidation'

@Injectable()
export class LoginContractorUseCase {
  constructor(private contractorRepository: IContractorRepository) {}

  async execute(data: loginDTO) {
    return await this.contractorRepository.login(data.email, data.password)
  }
}
