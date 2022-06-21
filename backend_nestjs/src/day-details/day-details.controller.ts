import { Controller, Get } from '@nestjs/common';
import { DayDetailsService } from './day-details.service';

@Controller('day-details')
export class DayDetailsController {
  constructor(private readonly dayDetailsService: DayDetailsService) {}

  @Get()
  getDay() {
    return this.dayDetailsService.getDay();
  }
}
