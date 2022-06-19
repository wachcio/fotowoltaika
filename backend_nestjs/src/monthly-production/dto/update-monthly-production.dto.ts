import { PartialType } from '@nestjs/mapped-types';
import { CreateMonthlyProductionDto } from './create-monthly-production.dto';

export class UpdateMonthlyProductionDto extends PartialType(CreateMonthlyProductionDto) {}
