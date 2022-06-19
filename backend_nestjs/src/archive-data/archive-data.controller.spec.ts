import { Test, TestingModule } from '@nestjs/testing';
import { ArchiveDataController } from './archive-data.controller';
import { ArchiveDataService } from './archive-data.service';

describe('ArchiveDataController', () => {
  let controller: ArchiveDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArchiveDataController],
      providers: [ArchiveDataService],
    }).compile();

    controller = module.get<ArchiveDataController>(ArchiveDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
