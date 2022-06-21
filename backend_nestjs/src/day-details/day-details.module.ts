import { forwardRef, Module } from '@nestjs/common';
import { DayDetailsService } from './day-details.service';
import { DayDetailsController } from './day-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayDetail } from './entities/day-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DayDetail])],
  controllers: [DayDetailsController],
  providers: [DayDetailsService],
})
export class DayDetailsModule {}
