import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import {
  CommonInverterDataFroniusResponse,
  MinMaxInverterDataFroniusResponse,
  ThreePInverterDataFroniusResponse,
} from 'src/types';

@Injectable()
export class InverterRealtimeDataService {
  async commonInverterData() {
    try {
      const response: AxiosResponse<CommonInverterDataFroniusResponse> =
        await axios.get(
          `${process.env.PV_HOST}${process.env.INVERTER_REALTIME_DATA_CID}`,
        );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async threeP_inverter_data() {
    try {
      const response: AxiosResponse<ThreePInverterDataFroniusResponse> =
        await axios.get(
          `${process.env.PV_HOST}${process.env.INVERTER_REALTIME_DATA_3PID}`,
        );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async minMaxInverterData() {
    try {
      const response: AxiosResponse<MinMaxInverterDataFroniusResponse> =
        await axios.get(
          `${process.env.PV_HOST}${process.env.INVERTER_REALTIME_DATA_MMID}`,
        );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
