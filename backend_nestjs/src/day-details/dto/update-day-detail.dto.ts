import { PartialType } from '@nestjs/mapped-types';
import { CreateDayDetailDto } from './create-day-detail.dto';

export class UpdateDayDetailDto extends PartialType(CreateDayDetailDto) {}
