import { Module } from '@nestjs/common'
import { GetRegisteredCountController } from './getRegisteredCount.controller'
import { GetRegisteredCountUseCase } from '../../../app/useCases/client/getRegisteredCountUseCase'
import { IClientRepository } from '../../../app/repositories/IClientRepository'
import { FirebaseClientRepository } from '../../../app/repositories/implementations/firebaseClientRepository'
import { GetRegisteredClientsController } from './getRegisteredClients.controller'
import { GetRegisteredClientsUseCase } from '../../../app/useCases/client/getRegisteredClientsUseCase'
import { RegisterClientController } from './registerClient.controller'
import { RegisterClientUseCase } from '../../../app/useCases/client/registerClientUseCase'
import { ExportClientsToCSVController } from './exportClientsToCSV.controller'
import { ExportClientsToCsvUseCase } from '../../../app/useCases/client/ExportClientsToCsvUseCase'
import { ICSVParser } from '../../../libraries/jsonCSVParser/ICSVParser'
import { Json2CSV } from '../../../libraries/jsonCSVParser/implementations/json2csv'

@Module({
  controllers: [
    RegisterClientController,
    GetRegisteredCountController,
    GetRegisteredClientsController,
    ExportClientsToCSVController,
  ],
  providers: [
    {
      provide: IClientRepository,
      useClass: FirebaseClientRepository,
    },
    {
      provide: ICSVParser,
      useClass: Json2CSV,
    },
    RegisterClientUseCase,
    GetRegisteredCountUseCase,
    GetRegisteredClientsUseCase,
    ExportClientsToCsvUseCase,
  ],
})
export class ClientModule {}
