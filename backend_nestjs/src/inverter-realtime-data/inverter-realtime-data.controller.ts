import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InverterRealtimeDataService } from './inverter-realtime-data.service';
import { CreateInverterRealtimeDatumDto } from './dto/create-inverter-realtime-datum.dto';
import { UpdateInverterRealtimeDatumDto } from './dto/update-inverter-realtime-datum.dto';

@Controller('inverter-realtime-data')
export class InverterRealtimeDataController {
  constructor(
    private readonly inverterRealtimeDataService: InverterRealtimeDataService,
  ) {}

  @Get('/common-inverter-data')
  async commonInverterData() {
    return await this.inverterRealtimeDataService.commonInverterData();
  }
  @Get('/3p_inverter_data')
  async threePInverterData() {
    return await this.inverterRealtimeDataService.threeP_inverter_data();
  }
  @Get('/min_max_inverter_data')
  async minMaxInverterData() {
    return await this.inverterRealtimeDataService.minMaxInverterData();
  }
}
