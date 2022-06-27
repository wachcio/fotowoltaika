import { Injectable } from '@nestjs/common';

import axios from 'axios';
import * as dayjs from 'dayjs';
import _ from 'lodash';

@Injectable()
export class ArchiveDataService {
  async findAll() {
    const correctDate = dayjs().format('DD.MM.YYYY');

    function lastData(items: object) {
      let last = 0;

      for (const i in items) {
        if (Number(i) > last) last = items[i];
      }

      return last;
    }

    // console.log(
    //   `${process.env.PV_HOST}${process.env.INVERTER_ARCHIVE_DATA_STRINGS_DATA}&StartDate=${correctDate}&EndDate=${correctDate}`,
    // );

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
      const response = {};

      responseKeys.map((el) => {
        response[el] = lastData(
          data?.Body?.Data['inverter/1']?.Data[el]?.Values,
        );
      });
      return await response;
    } catch (error) {}
  }
}
