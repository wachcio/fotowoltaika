import { Test, TestingModule } from '@nestjs/testing';
import { DayDetailsService } from './day-details.service';

describe('DayDetailsService', () => {
  let service: DayDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayDetailsService],
    }).compile();

    service = module.get<DayDetailsService>(DayDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
