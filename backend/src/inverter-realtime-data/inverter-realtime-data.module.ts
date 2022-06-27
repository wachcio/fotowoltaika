import { Module } from '@nestjs/common';
import { InverterRealtimeDataService } from './inverter-realtime-data.service';
import { InverterRealtimeDataController } from './inverter-realtime-data.controller';

@Module({
  controllers: [InverterRealtimeDataController],
  providers: [InverterRealtimeDataService]
})
export class InverterRealtimeDataModule {}
