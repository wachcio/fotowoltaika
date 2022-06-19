import { Test, TestingModule } from '@nestjs/testing';
import { InverterRealtimeDataService } from './inverter-realtime-data.service';

describe('InverterRealtimeDataService', () => {
  let service: InverterRealtimeDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InverterRealtimeDataService],
    }).compile();

    service = module.get<InverterRealtimeDataService>(InverterRealtimeDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
