import { Test, TestingModule } from '@nestjs/testing';
import { DayDetailsController } from './day-details.controller';
import { DayDetailsService } from './day-details.service';

describe('DayDetailsController', () => {
  let controller: DayDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayDetailsController],
      providers: [DayDetailsService],
    }).compile();

    controller = module.get<DayDetailsController>(DayDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
