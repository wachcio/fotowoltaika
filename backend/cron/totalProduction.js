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

const writeTotalProductionToDatabase = async (data) => {
    connection.connect();
    const query = `INSERT INTO ${process.env.DB_TABLE_TOTAL_PRODUCTION} (value) VALUES  (${data})`;

    connection.query(query, (error, results, fields) => {
        if (error) throw error;
    });

    connection.end();
};

console.log(process.env.API_HOST);
axios
    .get(
        `${process.env.PV_HOST}solar_api/v1/GetPowerFlowRealtimeData.fcgi?Scope=System`
    )
    .then(async ({ data }) => {
        // handle success

        if (data.Body.Data.Inverters['1'].P > 0) {
            writeTotalProductionToDatabase(
                data.Body.Data.Inverters['1'].E_Total
            );
        }
    })
    .catch((error) => {
        // handle error
        console.log(error);
    });
