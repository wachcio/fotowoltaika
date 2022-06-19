import { Module } from '@nestjs/common';
import { MonthlyProductionService } from './monthly-production.service';
import { MonthlyProductionController } from './monthly-production.controller';

@Module({
  controllers: [MonthlyProductionController],
  providers: [MonthlyProductionService]
})
export class MonthlyProductionModule {}
