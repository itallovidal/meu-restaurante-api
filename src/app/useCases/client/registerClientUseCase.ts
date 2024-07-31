import { IClientRepository } from '../../repositories/IClient-repository'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { IRegisterClientDTO } from '../../../infra/validations/client/registerClientDTO'

@Injectable()
export class RegisterClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(collectionID: string, payload: IRegisterClientDTO) {
    try {
      await this.clientRepository.checkIfContractorExists(collectionID)
      await this.clientRepository.registerClient(collectionID, payload)

      return {
        message: 'Cliente registrado no banco com sucesso.',
        status: 201,
      }
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException('Erro interno.')
    }
  }
}
