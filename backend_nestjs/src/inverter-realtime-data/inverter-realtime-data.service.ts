import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import {
  CommonInverterData,
  MinMaxInverterData,
  ThreePInverterData,
} from 'src/types';

@Injectable()
export class InverterRealtimeDataService {
  async commonInverterData() {
    try {
      const response: AxiosResponse<CommonInverterData> = await axios.get(
        `${process.env.PV_HOST}${process.env.INVERTER_REALTIME_DATA_CID}`,
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async threeP_inverter_data() {
    try {
      const response: AxiosResponse<ThreePInverterData> = await axios.get(
        `${process.env.PV_HOST}${process.env.INVERTER_REALTIME_DATA_3PID}`,
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async minMaxInverterData() {
    try {
      const response: AxiosResponse<MinMaxInverterData> = await axios.get(
        `${process.env.PV_HOST}${process.env.INVERTER_REALTIME_DATA_MMID}`,
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
