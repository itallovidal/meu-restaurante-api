import { ICSVParser } from '../ICSVParser'
import { AsyncParser } from '@json2csv/node'

export class Json2CSV implements ICSVParser {
  async parse(obj: any[]) {
    const clientsJSON = JSON.stringify(obj)
    const parser = new AsyncParser()
    return await parser.parse(clientsJSON).promise()
  }
}
