import { Controller, Get } from '@nestjs/common';
import { StringsCurrentDataResponse } from 'src/types';
import { ArchiveDataService } from './archive-data.service';

@Controller('archive-data')
export class ArchiveDataController {
  constructor(private readonly archiveDataService: ArchiveDataService) {}

  @Get('/strings-current-data')
  async stringCurrentData(): Promise<StringsCurrentDataResponse> {
    return await this.archiveDataService.stringCurrentData();
  }
}
