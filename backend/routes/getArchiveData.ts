import express from 'express';
const router = express.Router();
import axios from 'axios';
import dayjs from 'dayjs';
import _ from 'lodash';

router.get('/StringsCurrentData', async (req, res, next) => {
  const correctDate = dayjs().format('DD.MM.YYYY');

  function lastData(items: object) {
    let last = 0;

    for (const i in items) {
      if (Number(i) > last) last = items[i];
    }

    return last;
  }

  console.log(
    `${process.env.PV_HOST}${process.env.INVERTER_ARCHIVE_DATA_STRINGS_DATA}&StartDate=${correctDate}&EndDate=${correctDate}`,
  );

  axios
    .get(
      `${process.env.PV_HOST}${process.env.INVERTER_ARCHIVE_DATA_STRINGS_DATA}&StartDate=${correctDate}&EndDate=${correctDate}`,
    )
    .then(async ({ data }) => {
      // handle success

      const responseKeys = [
        'Current_DC_String_1',
        'Current_DC_String_2',
        'Voltage_DC_String_1',
        'Voltage_DC_String_2',
        'Temperature_Powerstage',
      ];
      let response = {};

      responseKeys.map(el => {
        response[el] = lastData(data?.Body?.Data['inverter/1']?.Data[el]?.Values);
      });

      return res.send(response);
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
});
export { router as getArchiveData };
