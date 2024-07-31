import { Module } from '@nestjs/common'
import { GetContractorByIDController } from './getContractorByID.controller'
import { IContractorRepository } from '../../../app/repositories/IContractorRepository'
import { FirebaseContractorRepository } from '../../../app/repositories/implementations/firebaseContractorRepository'
import { GetContractorByIDUseCase } from '../../../app/useCases/contractor/getContractorByIDUseCase'
import { LoginController } from './login.controller'
import { LoginContractorUseCase } from '../../../app/useCases/contractor/loginContractorUseCase'
import { UpdateContractorUseCase } from '../../../app/useCases/contractor/updateContractorUseCase'
import { UpdateContractorController } from './updateContractor.controller'
import { CreateContractorController } from './createContractor.controller'
import { CreateContractorUseCase } from '../../../app/useCases/contractor/createContractorUseCase'

@Module({
  controllers: [
    GetContractorByIDController,
    LoginController,
    UpdateContractorController,
    CreateContractorController,
  ],
  providers: [
    {
      provide: IContractorRepository,
      useClass: FirebaseContractorRepository,
    },
    GetContractorByIDUseCase,
    LoginContractorUseCase,
    UpdateContractorUseCase,
    CreateContractorUseCase,
  ],
})
export class ContractorModule {}
