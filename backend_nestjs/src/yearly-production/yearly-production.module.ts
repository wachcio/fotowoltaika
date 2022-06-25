import { Module } from '@nestjs/common';
import { YearlyProductionService } from './yearly-production.service';
import { YearlyProductionController } from './yearly-production.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TotalProduction } from 'src/monthly-production/entities/monthly-production.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TotalProduction])],
  controllers: [YearlyProductionController],
  providers: [YearlyProductionService],
})
export class YearlyProductionModule {}
