import { IRegisterClientDTO } from '../../infra/validations/client/registerClientDTO'
import { IClient } from '../../domain/IClient'

export abstract class IClientRepository {
  abstract getRegisteredCount(collectionID: string)
  abstract checkIfContractorExists(collectionID: string)
  abstract registerClient(collectionID: string, client: IRegisterClientDTO)
  abstract getAllRegisters(
    collectionID: string,
    lastDoc: number,
    range?: number | 'all',
  ): Promise<IClient[]>

  abstract dbConnection()

  abstract saveCSV(id: string, file: any)
}
