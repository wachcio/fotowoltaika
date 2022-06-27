import { Test, TestingModule } from '@nestjs/testing';
import { YearlyProductionService } from './yearly-production.service';

describe('YearlyProductionService', () => {
  let service: YearlyProductionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YearlyProductionService],
    }).compile();

    service = module.get<YearlyProductionService>(YearlyProductionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
