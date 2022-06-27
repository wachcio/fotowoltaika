import { Controller, Get, Query } from '@nestjs/common';
import { EarlyProduction } from 'src/types/EarlyProduction';
import { YearlyProductionService } from './yearly-production.service';

@Controller('yearly-production')
export class YearlyProductionController {
  constructor(
    private readonly yearlyProductionService: YearlyProductionService,
  ) {}

  @Get()
  async yearlyProduction(
    @Query('year') year: number,
  ): Promise<EarlyProduction[] | { message: string }> {
    return await this.yearlyProductionService.yearlyProduction(year);
  }
}
