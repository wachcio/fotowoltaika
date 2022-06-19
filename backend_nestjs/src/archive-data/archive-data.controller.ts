import { Controller, Get } from '@nestjs/common';
import { ArchiveDataService } from './archive-data.service';

@Controller('archive-data')
export class ArchiveDataController {
  constructor(private readonly archiveDataService: ArchiveDataService) {}

  @Get('/strings-current-data')
  async findAll() {
    return await this.archiveDataService.findAll();
  }
}
