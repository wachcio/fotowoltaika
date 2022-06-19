import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyProductionController } from './monthly-production.controller';
import { MonthlyProductionService } from './monthly-production.service';

describe('MonthlyProductionController', () => {
  let controller: MonthlyProductionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonthlyProductionController],
      providers: [MonthlyProductionService],
    }).compile();

    controller = module.get<MonthlyProductionController>(MonthlyProductionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
