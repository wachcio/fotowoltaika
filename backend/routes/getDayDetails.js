const express = require('express');
const router = express.Router();

const dayjs = require('dayjs');
const isToday = require('dayjs/plugin/isToday');
dayjs.extend(isToday);
const objectSupport = require('dayjs/plugin/objectSupport');
dayjs.extend(objectSupport);
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(timezone);
const mysql = require('mysql');
const path = require('path');
// require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
console.log('dirname', path.join(__dirname, '..', '.env'));

console.log('getDetail ENV:', process.env.PV_HOST);

const axios = require('axios');
const _ = require('lodash');

dayjs.tz.setDefault('Europe/Warsaw');

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

  if (
    !dayjs({
      day: Number(req.query.day),
      month: Number(req.query.month) - 1,
      year: Number(req.query.year),
    }).isToday()
  ) {
    // console.log('API');
    const connection = mysql.createConnection({
      connectionLimit: 1,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      timezone: 'Europe/Warsaw',
      // debug: true,
    });
    let connectionResult;

    const { checkDate } = require('../helpers/checkDate');

    const getDayDetailsFromDatabase = ({ day, month, year }) => {
      return new Promise((resolve, reject) => {
        const query = `SELECT * FROM \`${process.env.DB_TABLE_DETAILED_DATA}\` WHERE YEAR( \`timestamp\` ) = ${year} AND MONTH(\`timestamp\`)=${month} AND DAY(\`timestamp\`)=${day}`;

        connection.query(query, function (error, results, fields) {
          if (error) throw error;

          connectionResult = results;

          let sum = 0;

          connectionResult.map(el => {
            // console.log(el);
            sum = sum + el.EnergyReal_WAC_Sum_Produced;
            el.EnergyReal_WAC_Sum_Produced_Until_Now = sum.toFixed(0);
          });

          return resolve();
        });
      });
    };

    try {
      if (
        checkDate({
          day: req.query.day,
          month: req.query.month,
          year: req.query.year,
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

    const channels = [
      // 'Current_DC_String_1',
      // 'Current_DC_String_2',
      // 'Voltage_DC_String_1',
      // 'Voltage_DC_String_2',
      // 'Temperature_Powerstage',
      // 'Voltage_AC_Phase_1',
      // 'Voltage_AC_Phase_2',
      // 'Voltage_AC_Phase_3',
      // 'Current_AC_Phase_1',
      // 'Current_AC_Phase_2',
      // 'Current_AC_Phase_3',
      'PowerReal_PAC_Sum',
      'EnergyReal_WAC_Sum_Produced',
    ];

    const detailedData = {};

    // const dateToFetch = '2021-08-20';
    const dateToFetch = dayjs().format('YYYY-MM-DD');

    const getAPIURL = () => {
      const correctDate = dayjs(dateToFetch).format('DD.MM.YYYY');
      let result = `${process.env.PV_HOST}solar_api/v1/GetArchiveData.cgi?Scope=System&StartDate=${correctDate}&EndDate=${correctDate}`;

      channels.map(e => {
        result += `&Channel=${e}`;
      });

      return result;
    };

    function fancyTimeFormat(duration) {
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
    class ArchiveReading {
      constructor(date) {
        this.dateString = date;
        // this.Current_DC_String_1 = '';
        // this.Current_DC_String_2 = '';
        // this.Voltage_DC_String_1 = '';
        // this.Voltage_DC_String_2 = '';
        // this.Temperature_Powerstage = '';
        // this.Voltage_AC_Phase_1 = '';
        // this.Voltage_AC_Phase_2 = '';
        // this.Voltage_AC_Phase_3 = '';
        // this.Current_AC_Phase_1 = '';
        // this.Current_AC_Phase_2 = '';
        // this.Current_AC_Phase_3 = '';
        this.PowerReal_PAC_Sum = 0;
        this.EnergyReal_WAC_Sum_Produced = 0;
        this.EnergyReal_WAC_Sum_Produced_Until_Now = 0;
        // this.Power_String_1 = '';
        // this.Power_String_2 = '';
      }

      createResponseObject() {
        return {
          PowerReal_PAC_Sum: Number(this.PowerReal_PAC_Sum).toFixed(),
          EnergyReal_WAC_Sum_Produced: Number(this.EnergyReal_WAC_Sum_Produced).toFixed(),
          EnergyReal_WAC_Sum_Produced_Until_Now: Number(
            this.EnergyReal_WAC_Sum_Produced_Until_Now,
          ).toFixed(),

          timestamp: this.dateString,
        };
      }
    }

    axios
      .get(`${getAPIURL()}`)
      .then(async ({ data }) => {
        channels.map((el, i) => {
          detailedData[el] = {
            ...data.Body.Data['inverter/1'].Data[el].Values,
          };

          detailedData[el] = _.mapKeys(detailedData[el], (v, key) =>
            // console.log(key);
            fancyTimeFormat(key),
          );
        });
      })
      .then(() => {
        const archiveReadingsArray = [];

        for (const date in detailedData.PowerReal_PAC_Sum) {
          const reading = new ArchiveReading(date);

          reading.PowerReal_PAC_Sum =
            detailedData.PowerReal_PAC_Sum[date] === undefined
              ? 0
              : detailedData.PowerReal_PAC_Sum[date];
          reading.EnergyReal_WAC_Sum_Produced =
            detailedData.EnergyReal_WAC_Sum_Produced[date] === undefined
              ? 0
              : detailedData.EnergyReal_WAC_Sum_Produced[date];

          archiveReadingsArray.push(reading);
        }
        let sum = 0;

        archiveReadingsArray.map(el => {
          // console.log(el);
          sum = sum + el.EnergyReal_WAC_Sum_Produced;
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

module.exports = router;
