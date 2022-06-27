import { Test, TestingModule } from '@nestjs/testing';
import { YearlyProductionController } from './yearly-production.controller';
import { YearlyProductionService } from './yearly-production.service';

describe('YearlyProductionController', () => {
  let controller: YearlyProductionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YearlyProductionController],
      providers: [YearlyProductionService],
    }).compile();

    controller = module.get<YearlyProductionController>(YearlyProductionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
