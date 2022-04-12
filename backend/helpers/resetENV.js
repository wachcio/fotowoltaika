const resetENV = () => {
  process.env.PV_HOST = '';
  process.env.API_HOST = '';
  process.env.DB_HOST = '';
  process.env.DB_NAME = '';
  process.env.DB_USER = '';
  process.env.DB_PASS = '';
  process.env.DB_TABLE_TOTAL_PRODUCTION = '';
  process.env.DB_TABLE_AC_DATA = '';
  process.env.DB_TABLE_DATA_MAX = '';
  process.env.DB_TABLE_DETAILED_DATA = '';

  process.env.INVERTER_REALTIME_DATA_CID = '';
  process.env.INVERTER_REALTIME_DATA_3PID = '';
};

module.exports = resetENV;
