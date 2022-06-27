import { Module } from '@nestjs/common';
import { ArchiveDataService } from './archive-data.service';
import { ArchiveDataController } from './archive-data.controller';

@Module({
  controllers: [ArchiveDataController],
  providers: [ArchiveDataService]
})
export class ArchiveDataModule {}
