import { Controller, Get, Query } from '@nestjs/common';
import { DayDetailsService } from './day-details.service';

@Controller('day-details')
export class DayDetailsController {
  constructor(private readonly dayDetailsService: DayDetailsService) {}

  @Get()
  getDayDetails(
    @Query('year') year: number,
    @Query('month') month: number,
    @Query('day') day: number,
  ) {
    return this.dayDetailsService.getDayDetails(year, month, day);
  }
}
