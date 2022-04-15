import express from 'express';
const router = express.Router();

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(isToday);
import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(timezone);
import mysql from 'mysql';
import path from 'path';
// require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
console.log('dirname', path.join(__dirname, '..', '.env'));

console.log('getDetail ENV:', process.env.PV_HOST);

import axios from 'axios';
import _ from 'lodash';
import e from 'express';

import { checkDate } from '../helpers/checkDate';

dayjs.tz.setDefault('Europe/Warsaw');

interface DayDetials {
  EnergyReal_WAC_Sum_Produced: number;
  EnergyReal_WAC_Sum_Produced_Until_Now: number;
}
type DaysDetials = DayDetials[];

enum Channels {
  Current_DC_String_1 = 'Current_DC_String_1',
  Current_DC_String_2 = 'Current_DC_String_2',
  Voltage_DC_String_1 = 'Voltage_DC_String_1',
  Voltage_DC_String_2 = 'Voltage_DC_String_2',
  Temperature_Powerstage = 'Temperature_Powerstage',
  Voltage_AC_Phase_1 = 'Voltage_AC_Phase_1',
  Voltage_AC_Phase_2 = 'Voltage_AC_Phase_2',
  Voltage_AC_Phase_3 = 'Voltage_AC_Phase_3',
  Current_AC_Phase_1 = 'Current_AC_Phase_1',
  Current_AC_Phase_2 = 'Current_AC_Phase_2',
  Current_AC_Phase_3 = 'Current_AC_Phase_3',
  PowerReal_PAC_Sum = 'PowerReal_PAC_Sum',
  EnergyReal_WAC_Sum_Produced = 'EnergyReal_WAC_Sum_Produced',
}
interface ChannelsObject {
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
  PowerReal_PAC_Sum: number;
  EnergyReal_WAC_Sum_Produced: number;
}
interface ArchiveReadingsData extends ChannelsObject {
  dateString: string;
  PowerReal_PAC_Sum: number;
  // EnergyReal_WAC_Sum_Produced: number;
  // EnergyReal_WAC_Sum_Produced_Until_Now: number;
  // this.Power_String_1 = '';
  // this.Power_String_2 = '';
}

interface PVResFancyDate {
  PowerReal_PAC_Sum: object;
  EnergyReal_WAC_Sum_Produced: object;
}

router.get('/', async (req, res, next) => {
  // console.log(
  //   'Today:',
  //   dayjs({
  //     day: Number(req.query.day),
  //     month: Number(req.query.month) - 1,
  //     year: Number(req.query.year),
  //   }).isToday(),
  //   dayjs({
  //     day: Number(req.query.day),
  //     month: Number(req.query.month) - 1,
  //     year: Number(req.query.year),
  //   }).format('YYYY-MM-DD HH:mm'),
  // );
  // const reqDate = {
  //   day: Number(req.query.day),
  //   month: Number(req.query.month) - 1,
  //   year: Number(req.query.year),
  // };

  const reqDate = new Date(
    Number(req.query.year),
    Number(req.query.month) - 1,
    Number(req.query.day),
  );

  if (!dayjs(reqDate).isToday()) {
    // console.log('API');
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      timezone: 'Europe/Warsaw',
      // debug: true,
    });
    let connectionResult: DaysDetials = [];

    const getDayDetailsFromDatabase = ({ day, month, year }) => {
      return new Promise<void>((resolve, reject) => {
        const query = `SELECT * FROM \`${process.env.DB_TABLE_DETAILED_DATA}\` WHERE YEAR( \`timestamp\` ) = ${year} AND MONTH(\`timestamp\`)=${month} AND DAY(\`timestamp\`)=${day}`;

        connection.query(query, function (error, results, fields) {
          if (error) throw error;

          connectionResult = results;

          let sum = 0;

          connectionResult.map((el: DayDetials) => {
            // console.log(el);
            sum = sum + el.EnergyReal_WAC_Sum_Produced;
            el.EnergyReal_WAC_Sum_Produced_Until_Now = Number(sum.toFixed(0));
          });

          return resolve();
        });
      });
    };

    try {
      if (
        checkDate({
          day: Number(req.query.day),
          month: Number(req.query.month),
          year: Number(req.query.year),
        })
      ) {
        res.status(404).json({ message: 'Provide wrong date.' });
        return;
      }
      await getDayDetailsFromDatabase({
        day: req.query.day,
        month: req.query.month,
        year: req.query.year,
      });

      res.status(200).json(connectionResult);
      // res.status(200).json({ test: 'test' });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  } else {
    // console.log('Fronius');

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

    // const dateToFetch = '2021-08-20';
    const dateToFetch = dayjs().format('YYYY-MM-DD');

    const getAPIURL = (): string => {
      const correctDate = dayjs(dateToFetch).format('DD.MM.YYYY');
      let result = `${process.env.PV_HOST}solar_api/v1/GetArchiveData.cgi?Scope=System&StartDate=${correctDate}&EndDate=${correctDate}`;

      channels.map(e => {
        console.log(channels[e]);

        result += `&Channel=${e}`;
      });
      console.log(result);

      return result;
    };

    function fancyTimeFormat(duration: number): string {
      // Hours, minutes and seconds
      const hrs = ~~(duration / 3600);
      const mins = ~~((duration % 3600) / 60);
      let ret = '';

      if (hrs === 0) {
        ret += `00:${mins < 10 ? '0' : ''}`;
      }

      if (hrs > 0) {
        if (hrs < 10) {
          ret += `0${hrs}:${mins < 10 ? '0' : ''}`;
        } else {
          ret += `${hrs}:${mins < 10 ? '0' : ''}`;
        }
      }

      ret += `${mins}`;

      ret = `${dayjs(dateToFetch).format('YYYY-MM-DD ') + ret}:00`;
      return ret;
    }

    // const detailedData: ChannelsObject = {
    //   EnergyReal_WAC_Sum_Produced: 0,
    //   PowerReal_PAC_Sum: 0,
    // };
    const detailedData: any = [];

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
        // console.log(this);

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
          Temperature_Powerstage: Number(this.Temperature_Powerstage.toFixed(2)),
          PowerReal_PAC_Sum: Number(this.PowerReal_PAC_Sum.toFixed()),
          EnergyReal_WAC_Sum_Produced: Number(this.EnergyReal_WAC_Sum_Produced.toFixed()),
          EnergyReal_WAC_Sum_Produced_Until_Now: Number(
            this.EnergyReal_WAC_Sum_Produced_Until_Now.toFixed(),
          ),

          timestamp: this.dateString,
        };
      }
    }

    axios
      .get(`${getAPIURL()}`)
      .then(async ({ data }) => {
        channels.map(el => {
          detailedData[el] = {
            ...data.Body.Data['inverter/1'].Data[el].Values,
          };

          detailedData[el] = _.mapKeys(detailedData[el], (v, key) => fancyTimeFormat(Number(key)));
        });
      })
      .then(() => {
        const archiveReadingsArray: ArchiveReading[] = [];

        for (const date in detailedData.PowerReal_PAC_Sum) {
          const reading = new ArchiveReading(date);

          reading.Current_AC_Phase_1 = detailedData.Current_AC_Phase_1[date] ?? 0;
          reading.Current_AC_Phase_2 = detailedData.Current_AC_Phase_2[date] ?? 0;
          reading.Current_AC_Phase_3 = detailedData.Current_AC_Phase_3[date] ?? 0;
          reading.Current_DC_String_1 = detailedData.Current_DC_String_1[date] ?? 0;
          reading.Current_DC_String_2 = detailedData.Current_DC_String_2[date] ?? 0;
          reading.Voltage_AC_Phase_1 = detailedData.Voltage_AC_Phase_1[date] ?? 0;
          reading.Voltage_AC_Phase_2 = detailedData.Voltage_AC_Phase_2[date] ?? 0;
          reading.Voltage_AC_Phase_3 = detailedData.Voltage_AC_Phase_3[date] ?? 0;
          reading.Voltage_DC_String_1 = detailedData.Voltage_DC_String_1[date] ?? 0;
          reading.Voltage_DC_String_2 = detailedData.Voltage_DC_String_2[date] ?? 0;
          reading.Power_String_1 =
            detailedData.Current_DC_String_1[date] * detailedData.Voltage_DC_String_1[date] ?? 0;
          reading.Power_String_2 =
            detailedData.Current_DC_String_2[date] * detailedData.Voltage_DC_String_2[date] ?? 0;

          reading.Temperature_Powerstage = detailedData.Temperature_Powerstage[date] ?? 0;
          reading.PowerReal_PAC_Sum = detailedData.PowerReal_PAC_Sum[date] ?? 0;
          reading.EnergyReal_WAC_Sum_Produced = detailedData.EnergyReal_WAC_Sum_Produced[date] ?? 0;

          archiveReadingsArray.push(reading);
        }
        let sum = 0;

        archiveReadingsArray.map(el => {
          sum = sum + Number(el.EnergyReal_WAC_Sum_Produced);
          el.EnergyReal_WAC_Sum_Produced_Until_Now = sum;
        });

        res.json(archiveReadingsArray.map(reading => reading.createResponseObject()));
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }
});

export { router as getDayDetails };
