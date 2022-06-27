import { DayDetail } from '../entities/day-detail.entity';

export class GetDayDetailDto extends DayDetail {
  EnergyReal_WAC_Sum_Produced_Until_Now: number;
}
