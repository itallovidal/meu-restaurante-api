import { IContractorRepository } from '../../repositories/IContractorRepository'
import { IContractorSchemaDTO } from '../../../infra/validations/contractor/ContractorSchema'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UpdateContractorUseCase {
  constructor(private contractorRepository: IContractorRepository) {}

  async execute(data: IContractorSchemaDTO, id: string) {
    return await this.contractorRepository.update(data, id)
  }
}
