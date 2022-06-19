import { Module } from '@nestjs/common';
import { YearlyProductionService } from './yearly-production.service';
import { YearlyProductionController } from './yearly-production.controller';

@Module({
  controllers: [YearlyProductionController],
  providers: [YearlyProductionService]
})
export class YearlyProductionModule {}
