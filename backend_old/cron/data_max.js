const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const axios = require('axios').default;
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

const writeDataMaxToDatabase = async (DAY_PMAX, DAY_UACMAX, DAY_UDCMAX) => {
    connection.connect();
    const query = `INSERT INTO ${process.env.DB_TABLE_DATA_MAX} (DAY_PMAX, DAY_UACMAX, DAY_UDCMAX) VALUES  (${DAY_PMAX}, ${DAY_UACMAX}, ${DAY_UDCMAX})`;

    connection.query(query, (error, results, fields) => {
        if (error) throw error;
    });

    connection.end();
};

axios
    .get(
        `${process.env.PV_HOST}solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=MinMaxInverterData`
    )
    .then(async ({ data }) => {
        // handle success

        if (Object.keys(data.Body.Data).length > 0) {
            writeDataMaxToDatabase(
                data.Body.Data.DAY_PMAX.Value,
                data.Body.Data.DAY_UACMAX.Value,
                data.Body.Data.DAY_UDCMAX.Value
            );
        }
    })
    .catch((error) => {
        // handle error
        console.log(error);
    });
