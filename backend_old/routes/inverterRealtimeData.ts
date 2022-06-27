import express from 'express';
const router = express.Router();
import axios, { AxiosResponse } from 'axios';
import { CommonInverterData, MinMaxInverterData, ThreePInverterData } from '../types';

router.get('/CommonInverterData', async (req, res, next) => {
  try {
    const response: AxiosResponse<CommonInverterData> = await axios.get(
      `${process.env.PV_HOST}${process.env.INVERTER_REALTIME_DATA_CID}`,
    );

    return res.send(response.data);
  } catch (error) {
    console.log(error);
  }
});

router.get('/3PInverterData', async (req, res, next) => {
  try {
    const response: AxiosResponse<ThreePInverterData> = await axios.get(
      `${process.env.PV_HOST}${process.env.INVERTER_REALTIME_DATA_3PID}`,
    );

    return res.send(response.data);
  } catch (error) {
    console.log(error);
  }
});

router.get<MinMaxInverterData>('/MinMaxInverterData', async (req, res, next) => {
  try {
    const response: AxiosResponse<MinMaxInverterData> = await axios.get(
      `${process.env.PV_HOST}${process.env.INVERTER_REALTIME_DATA_MMID}`,
    );

    return res.send(response.data);
  } catch (error) {
    console.log(error);
  }
});

export { router as inverterRealtimeData };
