import { Injectable } from '@nestjs/common';
import { CreateInverterRealtimeDatumDto } from './dto/create-inverter-realtime-datum.dto';
import { UpdateInverterRealtimeDatumDto } from './dto/update-inverter-realtime-datum.dto';

@Injectable()
export class InverterRealtimeDataService {
  create(createInverterRealtimeDatumDto: CreateInverterRealtimeDatumDto) {
    return 'This action adds a new inverterRealtimeDatum';
  }

  findAll() {
    return `This action returns all inverterRealtimeData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inverterRealtimeDatum`;
  }

  update(id: number, updateInverterRealtimeDatumDto: UpdateInverterRealtimeDatumDto) {
    return `This action updates a #${id} inverterRealtimeDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} inverterRealtimeDatum`;
  }
}
