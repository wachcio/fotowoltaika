import { Controller, Get, Query } from '@nestjs/common';
import { MonthlyProduction } from 'src/types';
import { MonthlyProductionService } from './monthly-production.service';

@Controller('monthly-production')
export class MonthlyProductionController {
  constructor(
    private readonly monthlyProductionService: MonthlyProductionService,
  ) {}

  @Get()
  async monthlyProduction(
    @Query('year') year: number,
    @Query('month') month: number,
  ): Promise<MonthlyProduction[] | { message: string }> {
    return await this.monthlyProductionService.monthlyProduction(year, month);
  }
}
