import express from 'express';
const router = express.Router();
import axios from 'axios';
import { CommonInverterData, MinMaxInverterData, ThreePInverterData } from '../types';

// console.log('env:', process.env.PV_HOST);

router.get('/CommonInverterData', async (req, res, next) => {
  axios
    .get<CommonInverterData>(
      // `${process.env.API_HOST}inverterRealtimeData/CommonInverterData`,
      `${process.env.PV_HOST}${process.env.INVERTER_REALTIME_DATA_CID}`,
    )
    .then(async ({ data }) => {
      // handle success
      // console.log(data.Body.Data.DAY_ENERGY);

      return res.send(data);
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
});

router.get('/3PInverterData', async (req, res, next) => {
  console.log(`${process.env.PV_HOST}${process.env.INVERTER_REALTIME_DATA_3PID}`);
  axios
    .get<ThreePInverterData>(`${process.env.PV_HOST}${process.env.INVERTER_REALTIME_DATA_3PID}`)
    .then(async ({ data }) => {
      // handle success

      return res.send(data);
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
});

router.get<MinMaxInverterData>('/MinMaxInverterData', async (req, res, next) => {
  console.log(`${process.env.PV_HOST}${process.env.INVERTER_REALTIME_DATA_MMID}`);
  axios
    .get(`${process.env.PV_HOST}${process.env.INVERTER_REALTIME_DATA_MMID}`)
    .then(async ({ data }) => {
      // handle success

      return res.send(data);
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
});

export { router as inverterRealtimeData };
