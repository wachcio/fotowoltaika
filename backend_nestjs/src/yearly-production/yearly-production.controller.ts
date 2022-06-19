import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { YearlyProductionService } from './yearly-production.service';
import { CreateYearlyProductionDto } from './dto/create-yearly-production.dto';
import { UpdateYearlyProductionDto } from './dto/update-yearly-production.dto';

@Controller('yearly-production')
export class YearlyProductionController {
  constructor(private readonly yearlyProductionService: YearlyProductionService) {}

  @Post()
  create(@Body() createYearlyProductionDto: CreateYearlyProductionDto) {
    return this.yearlyProductionService.create(createYearlyProductionDto);
  }

  @Get()
  findAll() {
    return this.yearlyProductionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.yearlyProductionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateYearlyProductionDto: UpdateYearlyProductionDto) {
    return this.yearlyProductionService.update(+id, updateYearlyProductionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.yearlyProductionService.remove(+id);
  }
}
