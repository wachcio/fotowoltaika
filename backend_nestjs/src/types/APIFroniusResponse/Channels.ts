export enum Channels {
  Current_DC_String_1 = 'Current_DC_String_1',
  Current_DC_String_2 = 'Current_DC_String_2',
  Voltage_DC_String_1 = 'Voltage_DC_String_1',
  Voltage_DC_String_2 = 'Voltage_DC_String_2',
  Temperature_Powerstage = 'Temperature_Powerstage',
  Voltage_AC_Phase_1 = 'Voltage_AC_Phase_1',
  Voltage_AC_Phase_2 = 'Voltage_AC_Phase_2',
  Voltage_AC_Phase_3 = 'Voltage_AC_Phase_3',
  Current_AC_Phase_1 = 'Current_AC_Phase_1',
  Current_AC_Phase_2 = 'Current_AC_Phase_2',
  Current_AC_Phase_3 = 'Current_AC_Phase_3',
  PowerReal_PAC_Sum = 'PowerReal_PAC_Sum',
  EnergyReal_WAC_Sum_Produced = 'EnergyReal_WAC_Sum_Produced',
}

export interface ChannelsObject {
  Current_DC_String_1: number;
  Current_DC_String_2: number;
  Voltage_DC_String_1: number;
  Voltage_DC_String_2: number;
  Temperature_Powerstage: number;
  Voltage_AC_Phase_1: number;
  Voltage_AC_Phase_2: number;
  Voltage_AC_Phase_3: number;
  Current_AC_Phase_1: number;
  Current_AC_Phase_2: number;
  Current_AC_Phase_3: number;
  PowerReal_PAC_Sum: number;
  EnergyReal_WAC_Sum_Produced: number;
}

export type ChannelObject = {
  [Channel in Channels]: {
    [x: string]: number;
  };
};
