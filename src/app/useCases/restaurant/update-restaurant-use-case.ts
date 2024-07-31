import { IRestaurantRepository } from '../../repositories/IRestaurant-repository'
import { IRestaurantSchema } from '../../../infra/validations/restaurant/restaurant-schema'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UpdateRestaurantUseCase {
  constructor(private contractorRepository: IRestaurantRepository) {}

  async execute(data: IRestaurantSchema, id: string) {
    return await this.contractorRepository.update(data, id)
  }
}
