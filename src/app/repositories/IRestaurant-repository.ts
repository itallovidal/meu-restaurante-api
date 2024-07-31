import { IRestaurantSchema } from '../../infra/validations/restaurant/restaurant-schema'
import { IRestaurant } from '../../domain/IRestaurant'

export abstract class IRestaurantRepository {
  abstract update(data: IRestaurantSchema, id: string)
  abstract getByID(id: string)
  abstract dbConnection()
  abstract create(data: IRestaurant)
  abstract login(email: string, password: string)
  abstract storeFile(image: Express.Multer.File, id: string)
}
