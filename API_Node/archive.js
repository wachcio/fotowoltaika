/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const axios = require('axios').default;
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
const dayjs = require('dayjs');
const _ = require('lodash');

const channels = [
  'Current_DC_String_1',
  'Current_DC_String_2',
  'Voltage_DC_String_1',
  'Voltage_DC_String_2',
  'Temperature_Powerstage',
  'Voltage_AC_Phase_1',
  'Voltage_AC_Phase_2',
  'Voltage_AC_Phase_3',
  'Current_AC_Phase_1',
  'Current_AC_Phase_2',
  'Current_AC_Phase_3',
  'PowerReal_PAC_Sum',
  'EnergyReal_WAC_Sum_Produced',
];

const detailedData = {};

// const dateToFetch = '2023-03-09';
const dateToFetch = dayjs().format('YYYY-MM-DD');

// const compressData = [];

const getAPIURL = () => {
  const correctDate = dayjs(dateToFetch).format('DD.MM.YYYY');
  let result = `${process.env.API_HOST}solar_api/v1/GetArchiveData.cgi?Scope=System&StartDate=${correctDate}&EndDate=${correctDate}`;
  channels.map(e => {
    // console.log(e);

    result += `&Channel=${e}`;
  });
 // console.log(result);

  return result;
};

const writeToDatabase = async data => {
  connection.connect();
  const query = `INSERT INTO \`${process.env.DB_TABLE_DETAILED_DATA}\` (\`Current_DC_String_1\`, \`Current_DC_String_2\`, \`Voltage_DC_String_1\`, \`Voltage_DC_String_2\`, \`Temperature_Powerstage\`, \`Voltage_AC_Phase_1\`, \`Voltage_AC_Phase_2\`, \`Voltage_AC_Phase_3\`, \`Current_AC_Phase_1\`, \`Current_AC_Phase_2\`, \`Current_AC_Phase_3\`, \`PowerReal_PAC_Sum\`, \`EnergyReal_WAC_Sum_Produced\`, \`Power_String_1\`, \`Power_String_2\`, \`timestamp\`) VALUES ${data};`;

  // console.log(query);
  // console.log(data);

  connection.query(query, (error, results, fields) => {
    if (error) throw error;
  });

  connection.end();
};

function fancyTimeFormat(duration) {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  // const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
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
    this.Current_DC_String_1 = '';
    this.Current_DC_String_2 = '';
    this.Voltage_DC_String_1 = '';
    this.Voltage_DC_String_2 = '';
    this.Temperature_Powerstage = '';
    this.Voltage_AC_Phase_1 = '';
    this.Voltage_AC_Phase_2 = '';
    this.Voltage_AC_Phase_3 = '';
    this.Current_AC_Phase_1 = '';
    this.Current_AC_Phase_2 = '';
    this.Current_AC_Phase_3 = '';
    this.PowerReal_PAC_Sum = '';
    this.EnergyReal_WAC_Sum_Produced = '';
    this.Power_String_1 = '';
    this.Power_String_2 = '';
  }

  createDbParams() {
    return `(${this.Current_DC_String_1},${this.Current_DC_String_2},${this.Voltage_DC_String_1},${
      this.Voltage_DC_String_2
    },${this.Temperature_Powerstage},${this.Voltage_AC_Phase_1},${this.Voltage_AC_Phase_2},${
      this.Voltage_AC_Phase_3
    },${this.Current_AC_Phase_1},${this.Current_AC_Phase_2},${this.Current_AC_Phase_3},${
      this.PowerReal_PAC_Sum
    },${this.EnergyReal_WAC_Sum_Produced},${this.Current_DC_String_1 * this.Voltage_DC_String_1},${
      this.Current_DC_String_2 * this.Voltage_DC_String_2
    },'${this.dateString}')`;
  }
}

axios
  .get(`${getAPIURL()}`)
  .then(async ({ data }) => {
    // handle success
    // console.log(data.Body.Data['inverter/1']);
    // console.log('length', data.length);

    // if (data.length > 0) {
    channels.map((el, i) => {
      detailedData[el] = {
        ...data.Body.Data['inverter/1'].Data[el].Values,
      };

      detailedData[el] = _.mapKeys(detailedData[el], (v, key) =>
        // console.log(key);
        fancyTimeFormat(key),
      );
    });
    // }
  })
  .then(() => {
    const archiveReadingsArray = [];

    // console.log('detailed data', detailedData);

    for (const date in detailedData.Current_DC_String_1) {
      const reading = new ArchiveReading(date);
      reading.Current_DC_String_1 =
        detailedData.Current_DC_String_1[date] === undefined
          ? 0
          : detailedData.Current_DC_String_1[date];
      reading.Current_DC_String_2 =
        detailedData.Current_DC_String_2[date] === undefined
          ? 0
          : detailedData.Current_DC_String_2[date];
      reading.Voltage_DC_String_1 =
        detailedData.Voltage_DC_String_1[date] === undefined
          ? 0
          : detailedData.Voltage_DC_String_1[date];
      reading.Voltage_DC_String_2 =
        detailedData.Voltage_DC_String_2[date] === undefined
          ? 0
          : detailedData.Voltage_DC_String_2[date];
      reading.Temperature_Powerstage =
        detailedData.Temperature_Powerstage[date] === undefined
          ? 0
          : detailedData.Temperature_Powerstage[date];
      reading.Voltage_AC_Phase_1 =
        detailedData.Voltage_AC_Phase_1[date] === undefined
          ? 0
          : detailedData.Voltage_AC_Phase_1[date];
      reading.Voltage_AC_Phase_2 =
        detailedData.Voltage_AC_Phase_2[date] === undefined
          ? 0
          : detailedData.Voltage_AC_Phase_2[date];
      reading.Voltage_AC_Phase_3 =
        detailedData.Voltage_AC_Phase_3[date] === undefined
          ? 0
          : detailedData.Voltage_AC_Phase_3[date];
      reading.Voltage_DC_String_1 =
        detailedData.Voltage_DC_String_1[date] === undefined
          ? 0
          : detailedData.Voltage_DC_String_1[date];
      reading.Voltage_DC_String_2 =
        detailedData.Voltage_DC_String_2[date] === undefined
          ? 0
          : detailedData.Voltage_DC_String_2[date];
      reading.Current_AC_Phase_1 =
        detailedData.Current_AC_Phase_1[date] === undefined
          ? 0
          : detailedData.Current_AC_Phase_1[date];
      reading.Current_AC_Phase_2 =
        detailedData.Current_AC_Phase_2[date] === undefined
          ? 0
          : detailedData.Current_AC_Phase_2[date];
      reading.Current_AC_Phase_3 =
        detailedData.Current_AC_Phase_3[date] === undefined
          ? 0
          : detailedData.Current_AC_Phase_3[date];
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

    const queryParamsList = archiveReadingsArray.map(reading => reading.createDbParams());
    // console.log(queryParamsList);
    writeToDatabase(queryParamsList.join(','));
  })
  .catch(error => {
    // handle error
    console.log(error);
  });
