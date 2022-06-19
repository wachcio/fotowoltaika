import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArchiveDataService } from './archive-data.service';
import { CreateArchiveDatumDto } from './dto/create-archive-datum.dto';
import { UpdateArchiveDatumDto } from './dto/update-archive-datum.dto';

@Controller('archive-data')
export class ArchiveDataController {
  constructor(private readonly archiveDataService: ArchiveDataService) {}

  @Post()
  create(@Body() createArchiveDatumDto: CreateArchiveDatumDto) {
    return this.archiveDataService.create(createArchiveDatumDto);
  }

  @Get()
  findAll() {
    return this.archiveDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.archiveDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArchiveDatumDto: UpdateArchiveDatumDto) {
    return this.archiveDataService.update(+id, updateArchiveDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archiveDataService.remove(+id);
  }
}
