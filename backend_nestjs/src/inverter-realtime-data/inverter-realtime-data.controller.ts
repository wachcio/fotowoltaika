import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InverterRealtimeDataService } from './inverter-realtime-data.service';
import { CreateInverterRealtimeDatumDto } from './dto/create-inverter-realtime-datum.dto';
import { UpdateInverterRealtimeDatumDto } from './dto/update-inverter-realtime-datum.dto';

@Controller('inverter-realtime-data')
export class InverterRealtimeDataController {
  constructor(private readonly inverterRealtimeDataService: InverterRealtimeDataService) {}

  @Post()
  create(@Body() createInverterRealtimeDatumDto: CreateInverterRealtimeDatumDto) {
    return this.inverterRealtimeDataService.create(createInverterRealtimeDatumDto);
  }

  @Get()
  findAll() {
    return this.inverterRealtimeDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inverterRealtimeDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInverterRealtimeDatumDto: UpdateInverterRealtimeDatumDto) {
    return this.inverterRealtimeDataService.update(+id, updateInverterRealtimeDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inverterRealtimeDataService.remove(+id);
  }
}
