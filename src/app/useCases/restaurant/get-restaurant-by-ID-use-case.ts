import { Injectable } from '@nestjs/common'
import { IRestaurantRepository } from '../../repositories/IRestaurant-repository'

@Injectable()
export class GetRestaurantByIDUseCase {
  constructor(private contractorRepository: IRestaurantRepository) {}

  async execute(id: string) {
    return await this.contractorRepository.getByID(id)
  }
}
