import { IClientRepository } from '../../repositories/IClient-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GetRegisteredClientsUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(collectionID: string, lastDoc: number) {
    try {
      await this.clientRepository.checkIfContractorExists(collectionID)

      return await this.clientRepository.getAllRegisters(collectionID, lastDoc)
    } catch (e) {
      console.log(e)
    }
  }
}
