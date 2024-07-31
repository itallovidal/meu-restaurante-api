import { Module } from '@nestjs/common'
import { GetRestaurantByIDController } from './get-restaurant-by-ID-controller'
import { IContractorRepository } from '../../../app/repositories/IContractorRepository'
import { FirebaseContractorRepository } from '../../../app/repositories/implementations/firebaseContractorRepository'
import { GetRestaurantByIDUseCase } from '../../../app/useCases/restaurant/get-restaurant-by-ID-use-case'
import { LoginController } from './login.controller'
import { LoginRestaurantUseCase } from '../../../app/useCases/restaurant/login-restaurant-use-case'
import { UpdateRestaurantUseCase } from '../../../app/useCases/restaurant/update-restaurant-use-case'
import { UpdateRestaurantController } from './update-restaurant.controller'
import { CreateRestaurantController } from './create-restaurant-controller'
import { CreateRestaurantUseCase } from '../../../app/useCases/restaurant/create-restaurant-use-case'

@Module({
  controllers: [
    GetRestaurantByIDController,
    LoginController,
    UpdateRestaurantController,
    CreateRestaurantController,
  ],
  providers: [
    {
      provide: IContractorRepository,
      useClass: FirebaseContractorRepository,
    },
    GetRestaurantByIDUseCase,
    LoginRestaurantUseCase,
    UpdateRestaurantUseCase,
    CreateRestaurantUseCase,
  ],
})
export class ContractorModule {}
