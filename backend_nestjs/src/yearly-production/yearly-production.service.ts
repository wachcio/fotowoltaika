import { Injectable } from '@nestjs/common';
import { CreateYearlyProductionDto } from './dto/create-yearly-production.dto';
import { UpdateYearlyProductionDto } from './dto/update-yearly-production.dto';

@Injectable()
export class YearlyProductionService {
  create(createYearlyProductionDto: CreateYearlyProductionDto) {
    return 'This action adds a new yearlyProduction';
  }

  findAll() {
    return `This action returns all yearlyProduction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} yearlyProduction`;
  }

  update(id: number, updateYearlyProductionDto: UpdateYearlyProductionDto) {
    return `This action updates a #${id} yearlyProduction`;
  }

  remove(id: number) {
    return `This action removes a #${id} yearlyProduction`;
  }
}
