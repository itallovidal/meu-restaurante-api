import { Injectable } from '@nestjs/common'
import { IContractorRepository } from '../../repositories/IContractorRepository'

@Injectable()
export class GetContractorByIDUseCase {
  constructor(private contractorRepository: IContractorRepository) {}

  async execute(id: string) {
    return await this.contractorRepository.getByID(id)
  }
}
