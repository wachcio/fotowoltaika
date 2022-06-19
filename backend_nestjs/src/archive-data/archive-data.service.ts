import { Injectable } from '@nestjs/common';
import { CreateArchiveDatumDto } from './dto/create-archive-datum.dto';
import { UpdateArchiveDatumDto } from './dto/update-archive-datum.dto';

@Injectable()
export class ArchiveDataService {
  create(createArchiveDatumDto: CreateArchiveDatumDto) {
    return 'This action adds a new archiveDatum';
  }

  findAll() {
    return `This action returns all archiveData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} archiveDatum`;
  }

  update(id: number, updateArchiveDatumDto: UpdateArchiveDatumDto) {
    return `This action updates a #${id} archiveDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} archiveDatum`;
  }
}
