import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyProductionService } from './monthly-production.service';

describe('MonthlyProductionService', () => {
  let service: MonthlyProductionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthlyProductionService],
    }).compile();

    service = module.get<MonthlyProductionService>(MonthlyProductionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
