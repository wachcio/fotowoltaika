const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rfs = require('rotating-file-stream'); // version 2.x
const compression = require('compression');

const indexRouter = require('./routes/index');
const getDayDetails = require('./routes/getDayDetails');
const getMonthlyProduction = require('./routes/getMonthlyProduction');
const getYearlyProduction = require('./routes/getYearlyProduction');
// const testEnv = require('./routes/testEnv');
const inverterRealtimeData = require('./routes/inverterRealtimeData');
const getArchiveData = require('./routes/getArchiveData');
const energa = require('./routes/energa');

const app = express();
// compress responses
app.use(compression());

app.use(cors({ origin: '*' }));

app.set('view engine', 'pug');

// setup the logger
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log'),
});
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/getDayDetails', getDayDetails);
app.use('/getMonthlyProduction', getMonthlyProduction);
app.use('/getYearlyProduction', getYearlyProduction);
// app.use('/testenv', testEnv);
app.use('/inverterRealtimeData', inverterRealtimeData);
app.use('/getArchiveData', getArchiveData);

app.use('/energa', energa);

module.exports = app;
