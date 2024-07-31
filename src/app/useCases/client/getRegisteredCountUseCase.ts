import { IClientRepository } from '../../repositories/IClientRepository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GetRegisteredCountUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(collectionID: string) {
    return await this.clientRepository.getRegisteredCount(collectionID)
  }
}
