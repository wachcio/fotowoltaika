import { Injectable } from '@nestjs/common';
import { CreateMonthlyProductionDto } from './dto/create-monthly-production.dto';
import { UpdateMonthlyProductionDto } from './dto/update-monthly-production.dto';

@Injectable()
export class MonthlyProductionService {
  create(createMonthlyProductionDto: CreateMonthlyProductionDto) {
    return 'This action adds a new monthlyProduction';
  }

  findAll() {
    return `This action returns all monthlyProduction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monthlyProduction`;
  }

  update(id: number, updateMonthlyProductionDto: UpdateMonthlyProductionDto) {
    return `This action updates a #${id} monthlyProduction`;
  }

  remove(id: number) {
    return `This action removes a #${id} monthlyProduction`;
  }
}
