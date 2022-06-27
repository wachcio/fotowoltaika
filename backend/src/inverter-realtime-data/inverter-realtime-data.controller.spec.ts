import { Test, TestingModule } from '@nestjs/testing';
import { InverterRealtimeDataController } from './inverter-realtime-data.controller';
import { InverterRealtimeDataService } from './inverter-realtime-data.service';

describe('InverterRealtimeDataController', () => {
  let controller: InverterRealtimeDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InverterRealtimeDataController],
      providers: [InverterRealtimeDataService],
    }).compile();

    controller = module.get<InverterRealtimeDataController>(InverterRealtimeDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
