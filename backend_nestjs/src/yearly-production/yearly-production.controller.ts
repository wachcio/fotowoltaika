import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { YearlyProductionService } from './yearly-production.service';

@Controller('yearly-production')
export class YearlyProductionController {
  constructor(
    private readonly yearlyProductionService: YearlyProductionService,
  ) {}

  @Get()
  async yearlyProduction(@Query('year') year: number) {
    return this.yearlyProductionService.yearlyProduction(year);
  }
}
