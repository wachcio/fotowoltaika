import express from 'express';
const router = express.Router();

import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(timezone);
import mysql from 'mysql';

dayjs.tz.setDefault('Europe/Warsaw');

router.get('/', async (req, res, next) => {
  const connection = mysql.createConnection({
    connectTimeout: 60000,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    timezone: 'Europe/Warsaw',
    // debug: true,
  });
  let connectionResult;

  const { checkDate } = require('../helpers/checkDate');

  const getMonthlyProductionFromDatabase = ({ month, year }) => {
    return new Promise<void>((resolve, reject) => {
      const query = `SELECT @row_number:=DAY(\`timestamp\`) AS Day, (MAX(\`value\`)-MIN(\`value\`)) AS Production FROM \`${process.env.DB_TABLE_TOTAL_PRODUCTION}\` WHERE YEAR(\`timestamp\`) = ${year} AND MONTH(\`timestamp\`) = ${month} GROUP BY YEAR(\`timestamp\`), MONTH(\`timestamp\`), DAY(\`timestamp\`)`;

      connection.query(query, function (error, results, fields) {
        if (error) throw error;

        connectionResult = results;

        return resolve();
      });
    });
  };

  try {
    if (
      checkDate({
        day: 1,
        month: req.query.month,
        year: req.query.year,
      })
    ) {
      res.status(404).json({ message: 'Provide wrong date.' });
      return;
    }
    await getMonthlyProductionFromDatabase({
      month: req.query.month,
      year: req.query.year,
    });

    res.status(200).json(connectionResult);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export { router as getMonthlyProduction };
