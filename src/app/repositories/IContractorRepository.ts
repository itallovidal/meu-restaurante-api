import { IRestaurantSchemaDTO } from '../../infra/validations/restaurant/restaurant-schema'
import { IPolitic } from '../../domain/IContractor'

export abstract class IContractorRepository {
  abstract update(data: IRestaurantSchemaDTO, id: string)
  abstract getByID(id: string)
  abstract dbConnection()
  abstract create(data: IPolitic)
  abstract login(email: string, password: string)
  abstract storeFile(image: Express.Multer.File, id: string)
}
