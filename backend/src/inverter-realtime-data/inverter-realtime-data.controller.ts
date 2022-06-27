import { Controller, Get } from '@nestjs/common';
import {
  CommonInverterDataFroniusResponse,
  MinMaxInverterDataFroniusResponse,
  ThreePInverterDataFroniusResponse,
} from 'src/types';
import { InverterRealtimeDataService } from './inverter-realtime-data.service';

@Controller('inverter-realtime-data')
export class InverterRealtimeDataController {
  constructor(
    private readonly inverterRealtimeDataService: InverterRealtimeDataService,
  ) {}

  @Get('/common-inverter-data')
  async commonInverterData(): Promise<CommonInverterDataFroniusResponse> {
    return await this.inverterRealtimeDataService.commonInverterData();
  }
  @Get('/3p_inverter_data')
  async threePInverterData(): Promise<ThreePInverterDataFroniusResponse> {
    return await this.inverterRealtimeDataService.threeP_inverter_data();
  }
  @Get('/min_max_inverter_data')
  async minMaxInverterData(): Promise<MinMaxInverterDataFroniusResponse> {
    return await this.inverterRealtimeDataService.minMaxInverterData();
  }
}
