import { Injectable } from '@nestjs/common';

import axios from 'axios';
import * as dayjs from 'dayjs';
import _ from 'lodash';
import { StringsCurrentDataResponse } from 'src/types';

@Injectable()
export class ArchiveDataService {
  async stringCurrentData(): Promise<StringsCurrentDataResponse> {
    const correctDate = dayjs().format('DD.MM.YYYY');

    function lastData(items: object) {
      let last = 0;

      for (const i in items) {
        if (Number(i) > last) last = items[i];
      }

      return last;
    }

    try {
      const { data } = await axios.get(
        `${process.env.PV_HOST}${process.env.INVERTER_ARCHIVE_DATA_STRINGS_DATA}&StartDate=${correctDate}&EndDate=${correctDate}`,
      );
      // handle success
      const responseKeys = [
        'Current_DC_String_1',
        'Current_DC_String_2',
        'Voltage_DC_String_1',
        'Voltage_DC_String_2',
        'Temperature_Powerstage',
      ];
      const response: StringsCurrentDataResponse = {
        Current_DC_String_1: 0,
        Current_DC_String_2: 0,
        Voltage_DC_String_1: 0,
        Voltage_DC_String_2: 0,
        Temperature_Powerstage: 0,
      };

      responseKeys.map((el) => {
        response[el] = lastData(
          data?.Body?.Data['inverter/1']?.Data[el]?.Values,
        );
      });
      return await response;
    } catch (error) {}
  }
}
