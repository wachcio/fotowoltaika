import { Controller, Get, Query } from '@nestjs/common';
import { DayDetailsResponse } from 'src/types';
import { DayDetailsService } from './day-details.service';

@Controller('day-details')
export class DayDetailsController {
  constructor(private readonly dayDetailsService: DayDetailsService) {}

  @Get()
  async getDayDetails(
    @Query('year') year: number,
    @Query('month') month: number,
    @Query('day') day: number,
  ): Promise<DayDetailsResponse[] | { message: string }> {
    return await this.dayDetailsService.getDayDetails(year, month, day);
  }
}
