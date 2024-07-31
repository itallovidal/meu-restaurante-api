import { Module } from '@nestjs/common'
import { RestaurantModule } from './infra/controllers/restaurant'
import { ClientModule } from './infra/controllers/client'

@Module({
  imports: [RestaurantModule, ClientModule],
})
export class AppModule {}
