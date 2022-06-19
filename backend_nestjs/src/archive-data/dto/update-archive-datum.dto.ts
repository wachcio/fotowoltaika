import { PartialType } from '@nestjs/mapped-types';
import { CreateArchiveDatumDto } from './create-archive-datum.dto';

export class UpdateArchiveDatumDto extends PartialType(CreateArchiveDatumDto) {}
