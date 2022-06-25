import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import * as objectSupport from 'dayjs/plugin/objectSupport';
import * as timezone from 'dayjs/plugin/timezone';
import { Repository } from 'typeorm';
import { checkYear } from '../helpers/checkDate';
import { TotalProduction } from '../monthly-production/entities/monthly-production.entity';

dayjs.extend(timezone);
dayjs.extend(objectSupport);
dayjs.tz.setDefault('Europe/Warsaw');

@Injectable()
export class YearlyProductionService {
  constructor(
    @InjectRepository(TotalProduction)
    private totalProductionRepository: Repository<TotalProduction>,
  ) {}

  async yearlyProduction(year: number) {
    try {
      if (
        !checkYear({
          year: Number(year),
        })
      ) {
        return { message: 'Provide wrong date.' };
      }

      return await this.totalProductionRepository
        .createQueryBuilder('total_production')
        .select(
          `@row_number:=MONTH(\`timestamp\`) AS Month, (MAX(\`value\`)-MIN(\`value\`)) AS Production`,
        )
        .where(`YEAR( \`timestamp\` ) = :year`, { year: Number(year) })
        .groupBy(`YEAR(\`timestamp\`), MONTH(\`timestamp\`)`)
        .getRawMany();
    } catch (e) {
      console.log(e);
    }
  }
}
