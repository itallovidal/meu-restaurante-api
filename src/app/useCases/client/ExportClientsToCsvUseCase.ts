import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { IClientRepository } from '../../repositories/IClient-repository'
import { ICSVParser } from '../../../libraries/jsonCSVParser/ICSVParser'

@Injectable()
export class ExportClientsToCsvUseCase {
  constructor(
    private clientRepository: IClientRepository,
    private csvParser: ICSVParser,
  ) {}

  async execute(collectionID: string) {
    try {
      await this.clientRepository.checkIfContractorExists(collectionID)

      const clients = await this.clientRepository.getAllRegisters(
        collectionID,
        0,
        'all',
      )

      const filteredClients = clients.map((client) => {
        const { created_at, endereco, id, ...rest } = client

        console.log(created_at, id)

        return {
          ...rest,
          bairro: endereco.bairro,
          cep: endereco.cep,
          rua: endereco.rua,
          UF: endereco.uf.toUpperCase(),
        }
      })

      return await this.csvParser.parse(filteredClients)

      // const file = new File([csv], 'planilha.csv', {
      //   type: 'text/csv',
      // })
      //
      // console.log(file.type)
      //
      // const buffer = await file.arrayBuffer()
      // const b = Buffer.from(buffer)
      // const urlToDownload = await this.clientRepository.saveCSV(id, b)
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException('Erro Interno de Servidor.')
    }
  }
}
