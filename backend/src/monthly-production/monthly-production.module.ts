import { Module } from '@nestjs/common';
import { MonthlyProductionService } from './monthly-production.service';
import { MonthlyProductionController } from './monthly-production.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TotalProduction } from '../common_entities/monthly-production.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TotalProduction])],
  controllers: [MonthlyProductionController],
  providers: [MonthlyProductionService],
})
export class MonthlyProductionModule {}
