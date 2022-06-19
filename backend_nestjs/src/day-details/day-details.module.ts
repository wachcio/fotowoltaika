import { Module } from '@nestjs/common';
import { DayDetailsService } from './day-details.service';
import { DayDetailsController } from './day-details.controller';

@Module({
  controllers: [DayDetailsController],
  providers: [DayDetailsService]
})
export class DayDetailsModule {}
