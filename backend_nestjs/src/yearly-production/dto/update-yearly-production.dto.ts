import { PartialType } from '@nestjs/mapped-types';
import { CreateYearlyProductionDto } from './create-yearly-production.dto';

export class UpdateYearlyProductionDto extends PartialType(CreateYearlyProductionDto) {}
