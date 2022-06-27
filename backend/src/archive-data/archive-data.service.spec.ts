import { Test, TestingModule } from '@nestjs/testing';
import { ArchiveDataService } from './archive-data.service';

describe('ArchiveDataService', () => {
  let service: ArchiveDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArchiveDataService],
    }).compile();

    service = module.get<ArchiveDataService>(ArchiveDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
