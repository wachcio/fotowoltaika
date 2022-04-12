const express = require('express');
const router = express.Router();

const dayjs = require('dayjs');
const objectSupport = require('dayjs/plugin/objectSupport');
dayjs.extend(objectSupport);
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(timezone);
const mysql = require('mysql');

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

  const { checkYear } = require('../helpers/checkDate');

  //SET @row_number:=0; SELECT @row_number:=DAY(`timestamp`) AS Day, (MAX(`value`)-MIN(`value`)) AS sum FROM `total_production` WHERE YEAR(`timestamp`) = 2021 AND MONTH(`timestamp`) = 7 GROUP BY YEAR(`timestamp`), MONTH(`timestamp`), DAY(`timestamp`)

  const getYearlyProductionFromDatabase = ({ year }) => {
    return new Promise((resolve, reject) => {
      // const query = `SELECT * FROM \`${process.env.DB_TABLE_DETAILED_DATA}\` WHERE YEAR( \`timestamp\` ) = ${year} AND MONTH(\`timestamp\`)=${month} AND DAY(\`timestamp\`)=${day}`;
      const query = `SELECT @row_number:=MONTH(\`timestamp\`) AS Month, (MAX(\`value\`)-MIN(\`value\`)) AS Production FROM \`${process.env.DB_TABLE_TOTAL_PRODUCTION}\` WHERE YEAR(\`timestamp\`) = ${year} GROUP BY YEAR(\`timestamp\`), MONTH(\`timestamp\`)`;

      connection.query(query, function (error, results, fields) {
        if (error) throw error;

        connectionResult = results;

        return resolve();
      });
    });
  };

  try {
    if (
      checkYear({
        year: req.query.year,
      })
    ) {
      res.status(404).json({ message: 'Provide wrong date.' });
      return;
    }
    await getYearlyProductionFromDatabase({
      year: req.query.year,
    });

    res.status(200).json(connectionResult);
    // res.status(200).json({ test: 'test' });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
