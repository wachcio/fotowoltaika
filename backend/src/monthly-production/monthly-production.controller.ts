import { Controller, Get, Query } from '@nestjs/common';
import { MonthlyProductionService } from './monthly-production.service';

@Controller('monthly-production')
export class MonthlyProductionController {
  constructor(
    private readonly monthlyProductionService: MonthlyProductionService,
  ) {}

  @Get()
  monthlyProduction(
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    return this.monthlyProductionService.monthlyProduction(year, month);
  }
}
