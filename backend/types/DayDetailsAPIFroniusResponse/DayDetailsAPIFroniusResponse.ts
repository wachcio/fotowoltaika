enum Channels {
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

type ChannelDetail = {
  [Channel in Channels]: {
    Unit: string;
    Values: { [Values: string]: number };
    _comment: string;
  };
};

interface OkDayDetailsAPIFroniusResponse {
  Body: {
    Data: {
      'inverter/1': {
        ['Data']: ChannelDetail;
      };
    };
  };
  Head: {
    RequestArguments: {
      Channel: string[];
      EndDate: string;
      HumanReadable: string;
      Scope: string;
      SeriesType: string;
      StartDate: string;
    };
    Status: {
      Code: number;
      ErrorDetail: {
        Nodes: [];
      };
      Reason: string;
      UserMessage: string;
    };
    Timestamp: string;
  };
}
interface BadDayDetailsAPIFroniusResponse {
  Body: {
    Data: {};
  };
  Head: {
    RequestArguments: {
      StartDate: null;
      Scope: string;
    };
    Status: {
      Code: number;
      ErrorDetail: {
        Nodes: [];
      };
      Reason: string;
      UserMessage: string;
    };
    Timestamp: string;
  };
}

type DayDetailsAPIFroniusResponse =
  | OkDayDetailsAPIFroniusResponse
  | BadDayDetailsAPIFroniusResponse;

//Template responses
const OkResponseTemplate: DayDetailsAPIFroniusResponse = {
  Body: {
    Data: {
      'inverter/1': {
        Data: {
          Current_AC_Phase_1: {
            Unit: 'A',
            Values: {
              '0': 0,
              '300': 0,
              '600': 0,
              '900': 0,
            },
            _comment: 'channelId=65794',
          },
          Current_AC_Phase_2: {
            Unit: 'A',
            Values: {
              '0': 0,
              '300': 0,
              '600': 0,
              '900': 0,
            },
            _comment: 'channelId=65794',
          },
          Voltage_AC_Phase_1: {
            Unit: 'A',
            Values: {
              '0': 0,
              '300': 0,
              '600': 0,
              '900': 0,
            },
            _comment: 'channelId=65794',
          },
          Voltage_AC_Phase_2: {
            Unit: 'A',
            Values: {
              '0': 0,
              '300': 0,
              '600': 0,
              '900': 0,
            },
            _comment: 'channelId=65794',
          },
          Voltage_AC_Phase_3: {
            Unit: 'A',
            Values: {
              '0': 0,
              '300': 0,
              '600': 0,
              '900': 0,
            },
            _comment: 'channelId=65794',
          },
          Voltage_DC_String_1: {
            Unit: 'A',
            Values: {
              '0': 0,
              '300': 0,
              '600': 0,
              '900': 0,
            },
            _comment: 'channelId=65794',
          },
          PowerReal_PAC_Sum: {
            Unit: 'A',
            Values: {
              '0': 0,
              '300': 0,
              '600': 0,
              '900': 0,
            },
            _comment: 'channelId=65794',
          },
          Current_AC_Phase_3: {
            Unit: 'A',
            Values: {
              '0': 0,
              '300': 0,
              '600': 0,
              '900': 0,
            },
            _comment: 'channelId=65794',
          },
          Current_DC_String_1: {
            Unit: 'A',
            Values: {
              '0': 0,
              '300': 0,
              '600': 0,
              '900': 0,
            },
            _comment: 'channelId=65794',
          },
          Current_DC_String_2: {
            Unit: 'A',
            Values: {
              '0': 0,
              '300': 0,
              '600': 0,
              '900': 0,
            },
            _comment: 'channelId=65794',
          },
          EnergyReal_WAC_Sum_Produced: {
            Unit: 'A',
            Values: {
              '0': 0,
              '300': 0,
              '600': 0,
              '900': 0,
            },
            _comment: 'channelId=65794',
          },
          Voltage_DC_String_2: {
            Unit: 'A',
            Values: {
              '0': 0,
              '300': 0,
              '600': 0,
              '900': 0,
            },
            _comment: 'channelId=65794',
          },
          Temperature_Powerstage: {
            Unit: 'A',
            Values: {
              '0': 0,
              '300': 0,
              '600': 0,
              '900': 0,
            },
            _comment: 'channelId=65794',
          },
        },
      },
    },
  },
  Head: {
    RequestArguments: {
      Channel: [
        'Current_DC_String_1',
        'Current_DC_String_2',
        'Voltage_DC_String_1',
        'Voltage_DC_String_2',
        'Temperature_Powerstage',
        'Voltage_AC_Phase_1',
        'Voltage_AC_Phase_2',
        'Voltage_AC_Phase_3',
        'Current_AC_Phase_1',
        'Current_AC_Phase_2',
        'Current_AC_Phase_3',
        'PowerReal_PAC_Sum',
        'EnergyReal_WAC_Sum_Produced',
      ],
      EndDate: '2022-04-15T23:59:59+02:00',
      HumanReadable: 'True',
      Scope: 'System',
      SeriesType: 'Detail',
      StartDate: '2022-04-15T00:00:00+02:00',
    },
    Status: {
      Code: 0,
      ErrorDetail: {
        Nodes: [],
      },
      Reason: '',
      UserMessage: '',
    },
    Timestamp: '2022-04-15T21:47:54+02:00',
  },
};

const badResponseTemplate: DayDetailsAPIFroniusResponse = {
  Body: {
    Data: {},
  },
  Head: {
    RequestArguments: {
      Scope: 'System',
      StartDate: null,
    },
    Status: {
      Code: 255,
      ErrorDetail: {
        Nodes: [],
      },
      Reason: "invalid date (day) given '154.04.2022'",
      UserMessage: '',
    },
    Timestamp: '2022-04-15T22:38:42+02:00',
  },
};
