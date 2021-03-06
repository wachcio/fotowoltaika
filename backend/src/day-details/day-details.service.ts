import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import axios, { AxiosResponse } from 'axios';
import { mapKeys } from 'lodash';

import * as dayjs from 'dayjs';
import * as isToday from 'dayjs/plugin/isToday';
import * as objectSupport from 'dayjs/plugin/objectSupport';
import * as timezone from 'dayjs/plugin/timezone';
import { Repository } from 'typeorm';
import { DayDetail } from './entities/day-detail.entity';

import {
  DayDetailsAPIFroniusResponse,
  ArchiveReadingsData,
  EnergyReal_WAC_Sum_Produced,
  Channels,
  ChannelObject,
  DayDetailsResponse,
} from '../types';
import { checkDate } from '../helpers/checkDate';
import { fancyTimeFormat } from '../helpers/fancyFormat';
import { GetDayDetailDto } from './dto/get-day-detail.dto';

dayjs.extend(isToday);
dayjs.extend(objectSupport);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Warsaw');

const channels: Channels[] = [
  Channels.Current_DC_String_1,
  Channels.Current_DC_String_2,
  Channels.Voltage_DC_String_1,
  Channels.Voltage_DC_String_2,
  Channels.Temperature_Powerstage,
  Channels.Voltage_AC_Phase_1,
  Channels.Voltage_AC_Phase_2,
  Channels.Voltage_AC_Phase_3,
  Channels.Current_AC_Phase_1,
  Channels.Current_AC_Phase_2,
  Channels.Current_AC_Phase_3,
  Channels.PowerReal_PAC_Sum,
  Channels.EnergyReal_WAC_Sum_Produced,
];
@Injectable()
export class DayDetailsService {
  constructor(
    @InjectRepository(DayDetail)
    private dayDetailRepository: Repository<DayDetail>,
  ) {}

  getDetailsIfNotToday = async (
    year,
    month,
    day,
  ): Promise<DayDetailsResponse[]> => {
    //When date is not today

    let connectionResult: EnergyReal_WAC_Sum_Produced[] = [];

    const dayDetailsFromDatabase = (await this.dayDetailRepository
      .createQueryBuilder('item')
      .where(`YEAR( \`timestamp\` ) = :year`, { year: Number(year) })
      .andWhere(`MONTH(\`timestamp\`) = :month`, { month: Number(month) })
      .andWhere(`DAY(\`timestamp\`) = :day`, { day: Number(day) })
      .getMany()) as unknown as DayDetailsResponse[];

    let sum = 0;

    dayDetailsFromDatabase.map((el: DayDetailsResponse) => {
      sum = sum + el.EnergyReal_WAC_Sum_Produced;
      return (el.EnergyReal_WAC_Sum_Produced_Until_Now = Number(
        sum.toFixed(0),
      ));
    });
    return dayDetailsFromDatabase as unknown as DayDetailsResponse[];

    //
  };

  getDetailsToday = async (): Promise<DayDetailsResponse[]> => {
    // get data from Fronius API
    // const dateToFetch = '2021-08-20';
    const dateToFetch = dayjs().format('YYYY-MM-DD');
    //create API URL - add channels data
    const getAPIURL = (): string => {
      const correctDate = dayjs(dateToFetch).format('DD.MM.YYYY');
      let result = `${process.env.PV_HOST}solar_api/v1/GetArchiveData.cgi?Scope=System&StartDate=${correctDate}&EndDate=${correctDate}`;
      channels.map((e) => {
        result += `&Channel=${e}`;
      });
      return result;
    };
    class ArchiveReading implements ArchiveReadingsData {
      dateString: string;
      PowerReal_PAC_Sum: number;
      EnergyReal_WAC_Sum_Produced: number;
      EnergyReal_WAC_Sum_Produced_Until_Now: number;
      Current_DC_String_1: number;
      Current_DC_String_2: number;
      Voltage_DC_String_1: number;
      Voltage_DC_String_2: number;
      Temperature_Powerstage: number;
      Voltage_AC_Phase_1: number;
      Voltage_AC_Phase_2: number;
      Voltage_AC_Phase_3: number;
      Current_AC_Phase_1: number;
      Current_AC_Phase_2: number;
      Current_AC_Phase_3: number;
      Power_String_1: number;
      Power_String_2: number;

      constructor(date: string) {
        this.dateString = date;
        this.Current_DC_String_1 = 0;
        this.Current_DC_String_2 = 0;
        this.Voltage_DC_String_1 = 0;
        this.Voltage_DC_String_2 = 0;
        this.Temperature_Powerstage = 0;
        this.Voltage_AC_Phase_1 = 0;
        this.Voltage_AC_Phase_2 = 0;
        this.Voltage_AC_Phase_3 = 0;
        this.Current_AC_Phase_1 = 0;
        this.Current_AC_Phase_2 = 0;
        this.Current_AC_Phase_3 = 0;
        this.PowerReal_PAC_Sum = 0;
        this.EnergyReal_WAC_Sum_Produced = 0;
        this.EnergyReal_WAC_Sum_Produced_Until_Now = 0;
        this.Power_String_1 = 0;
        this.Power_String_2 = 0;
      }
      createResponseObject() {
        return {
          Current_AC_Phase_1: Number(this.Current_AC_Phase_1.toFixed(2)),
          Current_AC_Phase_2: Number(this.Current_AC_Phase_2.toFixed(2)),
          Current_AC_Phase_3: Number(this.Current_AC_Phase_3.toFixed(2)),
          Voltage_AC_Phase_1: Number(this.Voltage_AC_Phase_1.toFixed(2)),
          Voltage_AC_Phase_2: Number(this.Voltage_AC_Phase_2.toFixed(2)),
          Voltage_AC_Phase_3: Number(this.Voltage_AC_Phase_3.toFixed(2)),
          Current_DC_String_1: Number(this.Current_DC_String_1.toFixed(2)),
          Current_DC_String_2: Number(this.Current_DC_String_2.toFixed(2)),
          Voltage_DC_String_1: Number(this.Voltage_DC_String_1.toFixed(2)),
          Voltage_DC_String_2: Number(this.Voltage_DC_String_2.toFixed(2)),
          Power_String_1: Number(this.Power_String_1.toFixed(2)),
          Power_String_2: Number(this.Power_String_2.toFixed(2)),
          Temperature_Powerstage: Number(
            this.Temperature_Powerstage.toFixed(2),
          ),
          PowerReal_PAC_Sum: Number(this.PowerReal_PAC_Sum.toFixed()),
          EnergyReal_WAC_Sum_Produced: Number(
            this.EnergyReal_WAC_Sum_Produced.toFixed(),
          ),
          EnergyReal_WAC_Sum_Produced_Until_Now: Number(
            this.EnergyReal_WAC_Sum_Produced_Until_Now.toFixed(),
          ),
          timestamp: this.dateString,
        };
      }
    }

    try {
      const response: AxiosResponse<DayDetailsAPIFroniusResponse> =
        await axios.get(`${getAPIURL()}`);
      console.log({ response });

      const arrTmp = channels.map((el) => ({
        [el]: mapKeys(
          response.data.Body.Data['inverter/1'].Data[el].Values,
          (v, key) => fancyTimeFormat(Number(key), dateToFetch),
        ) as ChannelObject,
      }));

      console.log({ arrTmp });
      const objTmp = {};
      const data = arrTmp.map((el) => Object.assign(objTmp, el))[0];
      const archiveReadingsArray: ArchiveReading[] = [];
      for (const date in data.PowerReal_PAC_Sum) {
        const reading = new ArchiveReading(date);
        reading.Current_AC_Phase_1 = Number(data.Current_AC_Phase_1[date]) ?? 0;
        reading.Current_AC_Phase_2 = Number(data.Current_AC_Phase_2[date]) ?? 0;
        reading.Current_AC_Phase_3 = Number(data.Current_AC_Phase_3[date]) ?? 0;
        reading.Current_DC_String_1 =
          Number(data.Current_DC_String_1[date]) ?? 0;
        reading.Current_DC_String_2 =
          Number(data.Current_DC_String_2[date]) ?? 0;
        reading.Voltage_AC_Phase_1 = Number(data.Voltage_AC_Phase_1[date]) ?? 0;
        reading.Voltage_AC_Phase_2 = Number(data.Voltage_AC_Phase_2[date]) ?? 0;
        reading.Voltage_AC_Phase_3 = Number(data.Voltage_AC_Phase_3[date]) ?? 0;
        reading.Voltage_DC_String_1 =
          Number(data.Voltage_DC_String_1[date]) ?? 0;
        reading.Voltage_DC_String_2 =
          Number(data.Voltage_DC_String_2[date]) ?? 0;
        reading.Power_String_1 =
          Number(data.Current_DC_String_1[date]) *
            Number(data.Voltage_DC_String_1[date]) ?? 0;
        reading.Power_String_2 =
          Number(data.Current_DC_String_2[date]) *
            Number(data.Voltage_DC_String_2[date]) ?? 0;
        reading.Temperature_Powerstage =
          Number(data.Temperature_Powerstage[date]) ?? 0;
        reading.PowerReal_PAC_Sum = Number(data.PowerReal_PAC_Sum[date]) ?? 0;
        reading.EnergyReal_WAC_Sum_Produced =
          Number(data.EnergyReal_WAC_Sum_Produced[date]) ?? 0;
        archiveReadingsArray.push(reading);

        let sum = 0;
        archiveReadingsArray.map((el) => {
          sum = sum + Number(el.EnergyReal_WAC_Sum_Produced);
          el.EnergyReal_WAC_Sum_Produced_Until_Now = sum;
        });
      }
      console.log(archiveReadingsArray);

      return archiveReadingsArray.map((reading) =>
        reading.createResponseObject(),
      ) as unknown as DayDetailsResponse[];
    } catch {
      (error) => {
        // handle error
        console.log(error);
      };
    }
  };

  async getDayDetails(
    year: number,
    month: number,
    day: number,
  ): Promise<DayDetailsResponse[] | { message: string }> {
    if (
      checkDate({
        day: Number(day),
        month: Number(month),
        year: Number(year),
      })
    ) {
      //check date if today get data from Fronius API if not get data from database

      if (
        dayjs(new Date(Number(year), Number(month) - 1, Number(day))).isToday()
      ) {
        return await this.getDetailsToday();
      } else {
        return await this.getDetailsIfNotToday(year, month, day);
      }
    } else {
      return { message: 'Provide wrong date.' };
    }
  }
}
