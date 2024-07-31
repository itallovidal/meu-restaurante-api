import { IContractorRepository } from '../../repositories/IContractorRepository'
import { IRestaurantSchemaDTO } from '../../../infra/validations/restaurant/restaurant-schema'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UpdateRestaurantUseCase {
  constructor(private contractorRepository: IContractorRepository) {}

  async execute(data: IRestaurantSchemaDTO, id: string) {
    return await this.contractorRepository.update(data, id)
  }
}
