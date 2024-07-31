import { Module } from '@nestjs/common'
import { ContractorModule } from './infra/controllers/restaurant'
import { ClientModule } from './infra/controllers/client'

@Module({
  imports: [ContractorModule, ClientModule],
})
export class AppModule {}
