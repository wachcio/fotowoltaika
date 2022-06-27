import express from 'express';
import cors from 'cors';
// import path from 'path';
// import morgan from 'morgan';
// import rfs from 'rotating-file-stream'; // version 2.x
// import compression from 'compression';

import { indexRouter } from './routes/index';
import { getDayDetails } from './routes/getDayDetails';
import { getMonthlyProduction } from './routes/getMonthlyProduction';
import { getYearlyProduction } from './routes/getYearlyProduction';
import { inverterRealtimeData } from './routes/inverterRealtimeData';
import { getArchiveData } from './routes/getArchiveData';

const app = express();
// compress responses
// app.use(compression());

app.use(cors({ origin: '*' }));

// setup the logger
// const accessLogStream = rfs.createStream('access.log', {
//   interval: '1d', // rotate daily
//   path: path.join(__dirname, 'log'),
// });
// app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/getDayDetails', getDayDetails);
app.use('/getMonthlyProduction', getMonthlyProduction);
app.use('/getYearlyProduction', getYearlyProduction);
app.use('/inverterRealtimeData', inverterRealtimeData);
app.use('/getArchiveData', getArchiveData);

export { app };
