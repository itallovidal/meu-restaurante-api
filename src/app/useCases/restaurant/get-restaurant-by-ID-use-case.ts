import { Injectable } from '@nestjs/common'
import { IContractorRepository } from '../../repositories/IContractorRepository'

@Injectable()
export class GetRestaurantByIDUseCase {
  constructor(private contractorRepository: IContractorRepository) {}

  async execute(id: string) {
    return await this.contractorRepository.getByID(id)
  }
}
