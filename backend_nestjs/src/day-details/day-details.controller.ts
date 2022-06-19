import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DayDetailsService } from './day-details.service';
import { CreateDayDetailDto } from './dto/create-day-detail.dto';
import { UpdateDayDetailDto } from './dto/update-day-detail.dto';

@Controller('day-details')
export class DayDetailsController {
  constructor(private readonly dayDetailsService: DayDetailsService) {}

  @Post()
  create(@Body() createDayDetailDto: CreateDayDetailDto) {
    return this.dayDetailsService.create(createDayDetailDto);
  }

  @Get()
  findAll() {
    return this.dayDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dayDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDayDetailDto: UpdateDayDetailDto) {
    return this.dayDetailsService.update(+id, updateDayDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dayDetailsService.remove(+id);
  }
}
