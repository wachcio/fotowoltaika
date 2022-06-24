import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import * as objectSupport from 'dayjs/plugin/objectSupport';
import * as timezone from 'dayjs/plugin/timezone';
import { Repository } from 'typeorm';
import { checkDate } from '../helpers/checkDate';
import { TotalProduction } from './entities/monthly-production.entity';

dayjs.extend(timezone);
dayjs.extend(objectSupport);
dayjs.tz.setDefault('Europe/Warsaw');

@Injectable()
export class MonthlyProductionService {
  constructor(
    @InjectRepository(TotalProduction)
    private totalProductionRepository: Repository<TotalProduction>,
  ) {}

  async monthlyProduction(year: number, month: number) {
    try {
      if (
        !checkDate({
          day: 1,
          month: Number(month),
          year: Number(year),
        })
      ) {
        return { message: 'Provide wrong date.' };
      }

      return await this.totalProductionRepository
        .createQueryBuilder('total_production')
        .select(
          `@row_number:=DAY(\`timestamp\`) AS Day, (MAX(\`value\`)-MIN(\`value\`)) AS Production`,
        )
        .where(`YEAR( \`timestamp\` ) = :year`, { year: Number(year) })
        .andWhere(`MONTH(\`timestamp\`) = :month`, { month: Number(month) })
        .groupBy(
          `YEAR(\`timestamp\`), MONTH(\`timestamp\`), DAY(\`timestamp\`)`,
        )
        .getRawMany();
    } catch (e) {
      console.log(e);
    }
  }
}
