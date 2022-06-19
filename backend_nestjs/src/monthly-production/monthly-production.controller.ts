import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MonthlyProductionService } from './monthly-production.service';
import { CreateMonthlyProductionDto } from './dto/create-monthly-production.dto';
import { UpdateMonthlyProductionDto } from './dto/update-monthly-production.dto';

@Controller('monthly-production')
export class MonthlyProductionController {
  constructor(private readonly monthlyProductionService: MonthlyProductionService) {}

  @Post()
  create(@Body() createMonthlyProductionDto: CreateMonthlyProductionDto) {
    return this.monthlyProductionService.create(createMonthlyProductionDto);
  }

  @Get()
  findAll() {
    return this.monthlyProductionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monthlyProductionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonthlyProductionDto: UpdateMonthlyProductionDto) {
    return this.monthlyProductionService.update(+id, updateMonthlyProductionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monthlyProductionService.remove(+id);
  }
}
