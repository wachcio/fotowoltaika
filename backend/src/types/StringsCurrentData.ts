export interface StringsCurrentDataFroniusResponse {
  Body: {
    Data: {
      'inverter/1': {
        Data: {
          Current_DC_String_1: {
            Unit: string;
            Values: { [Values: string]: number };
            _comment: string;
          };
          Current_DC_String_2: {
            Unit: string;
            Values: { [Values: string]: number };
            _comment: string;
          };
          Temperature_Powerstage: {
            Unit: string;
            Values: { [Values: string]: number };
            _comment: string;
          };
          Voltage_DC_String_1: {
            Unit: string;
            Values: { [Values: string]: number };
            _comment: string;
          };
          Voltage_DC_String_2: {
            Unit: string;
            Values: { [Values: string]: number };
            _comment: string;
          };
        };
        DeviceType: number;
        End: string;
        NodeType: number;
        Start: string;
      };
    };
  };
  Head: {
    RequestArguments: {
      Channel: [
        'Voltage_DC_String_1',
        'Current_DC_String_1',
        'Voltage_DC_String_2',
        'Current_DC_String_2',
        'Temperature_Powerstage',
      ];
      EndDate: string;
      HumanReadable: string;
      Scope: string;
      SeriesType: string;
      StartDate: string;
    };
    Status: {
      Code: 0;
      ErrorDetail: {
        Nodes: [];
      };
      Reason: string;
      UserMessage: string;
    };
    Timestamp: string;
  };
}

export interface StringsCurrentDataResponse {
  Current_DC_String_1: number;
  Current_DC_String_2: number;
  Voltage_DC_String_1: number;
  Voltage_DC_String_2: number;
  Temperature_Powerstage: number;
}

const stringsCurrentDataTemplate: StringsCurrentDataFroniusResponse = {
  Body: {
    Data: {
      'inverter/1': {
        Data: {
          Current_DC_String_1: {
            Unit: 'A',
            Values: {
              '0': 0,
              '300': 0,
              '600': 0,
              '900': 0,
            },
            _comment: 'channelId=66050',
          },
          Current_DC_String_2: {
            Unit: 'A',
            Values: {
              '0': 0,
              '300': 0,
              '600': 0,
              '900': 0,
            },
            _comment: 'channelId=131586',
          },
          Temperature_Powerstage: {
            Unit: 'Â°C',
            Values: {
              '0': 0,
              '300': 0,
              '600': 0,
              '900': 0,
            },
            _comment: 'channelId=65795',
          },
          Voltage_DC_String_1: {
            Unit: 'V',
            Values: {
              '0': 14.800000000000001,
              '300': 14.5,
              '600': 14.600000000000001,
            },
            _comment: 'channelId=66049',
          },
          Voltage_DC_String_2: {
            Unit: 'V',
            Values: {
              '0': 14.700000000000001,
              '300': 14.4,
              '600': 14.5,
              '900': 14.9,
            },
            _comment: 'channelId=131585',
          },
        },
        DeviceType: 232,
        End: '2022-04-18T23:59:59+02:00',
        NodeType: 97,
        Start: '2022-04-18T00:00:00+02:00',
      },
    },
  },
  Head: {
    RequestArguments: {
      Channel: [
        'Voltage_DC_String_1',
        'Current_DC_String_1',
        'Voltage_DC_String_2',
        'Current_DC_String_2',
        'Temperature_Powerstage',
      ],
      EndDate: '2022-04-18T23:59:59+02:00',
      HumanReadable: 'True',
      Scope: 'System',
      SeriesType: 'Detail',
      StartDate: '2022-04-18T00:00:00+02:00',
    },
    Status: {
      Code: 0,
      ErrorDetail: {
        Nodes: [],
      },
      Reason: '',
      UserMessage: '',
    },
    Timestamp: '2022-04-18T22:22:33+02:00',
  },
};
