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

//console.log(process.env.PV_HOST);

const writeACDataToDatabase = async (IAC_L1, IAC_L2, IAC_L3, UAC_L1, UAC_L2, UAC_L3) => {
  connection.connect();
  const query = `INSERT INTO ${process.env.DB_TABLE_AC_DATA} (IAC_L1, IAC_L2, IAC_L3, UAC_L1, UAC_L2, UAC_L3) VALUES  (${IAC_L1}, ${IAC_L2}, ${IAC_L3}, ${UAC_L1}, ${UAC_L2}, ${UAC_L3})`;

  connection.query(query, (error, results, fields) => {
    if (error) throw error;
  });

  connection.end();
};

axios
  .get(
    `${process.env.API_HOST}solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=3PInverterData`,
  )
  .then(async ({ data }) => {
    // handle success

    if (Object.keys(data.Body.Data).length > 0) {
      writeACDataToDatabase(
        data.Body.Data.IAC_L1.Value,
        data.Body.Data.IAC_L1.Value,
        data.Body.Data.IAC_L1.Value,
        data.Body.Data.UAC_L1.Value,
        data.Body.Data.UAC_L2.Value,
        data.Body.Data.UAC_L3.Value,
      );
    }
  })
  .catch(error => {
    // handle error
    console.log(error);
  });
