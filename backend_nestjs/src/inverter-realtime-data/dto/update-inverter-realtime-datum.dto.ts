import { PartialType } from '@nestjs/mapped-types';
import { CreateInverterRealtimeDatumDto } from './create-inverter-realtime-datum.dto';

export class UpdateInverterRealtimeDatumDto extends PartialType(CreateInverterRealtimeDatumDto) {}
