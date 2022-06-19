import { Injectable } from '@nestjs/common';
import { CreateDayDetailDto } from './dto/create-day-detail.dto';
import { UpdateDayDetailDto } from './dto/update-day-detail.dto';

@Injectable()
export class DayDetailsService {
  create(createDayDetailDto: CreateDayDetailDto) {
    return 'This action adds a new dayDetail';
  }

  findAll() {
    return `This action returns all dayDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dayDetail`;
  }

  update(id: number, updateDayDetailDto: UpdateDayDetailDto) {
    return `This action updates a #${id} dayDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} dayDetail`;
  }
}
