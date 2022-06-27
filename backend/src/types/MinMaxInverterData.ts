export interface MinMaxInverterDataFroniusResponse {
  Body: {
    Data: {
      DAY_PMAX: {
        Unit: string;
        Value: number;
      };
      DAY_UACMAX: {
        Unit: string;
        Value: number;
      };
      DAY_UDCMAX: {
        Unit: string;
        Value: number;
      };
      TOTAL_PMAX: {
        Unit: string;
        Value: number;
      };
      TOTAL_UACMAX: {
        Unit: string;
        Value: number;
      };
      TOTAL_UDCMAX: {
        Unit: string;
        Value: number;
      };
      YEAR_PMAX: {
        Unit: string;
        Value: number;
      };
      YEAR_UACMAX: {
        Unit: string;
        Value: number;
      };
      YEAR_UDCMAX: {
        Unit: string;
        Value: number;
      };
    };
  };
  Head: {
    RequestArguments: {
      DataCollection: string;
      DeviceClass: string;
      DeviceId: string;
      Scope: string;
    };
    Status: {
      Code: number;
      Reason: string;
      UserMessage: string;
    };
    Timestamp: string;
  };
}

//Template response MinMaxInverterData
const minMaxInverterDataResponse: MinMaxInverterDataFroniusResponse = {
  Body: {
    Data: {
      DAY_PMAX: {
        Unit: 'W',
        Value: 8990,
      },
      DAY_UACMAX: {
        Unit: 'V',
        Value: 271,
      },
      DAY_UDCMAX: {
        Unit: 'V',
        Value: 555.8,
      },
      TOTAL_PMAX: {
        Unit: 'W',
        Value: 10079,
      },
      TOTAL_UACMAX: {
        Unit: 'V',
        Value: 271,
      },
      TOTAL_UDCMAX: {
        Unit: 'V',
        Value: 625.8,
      },
      YEAR_PMAX: {
        Unit: 'W',
        Value: 10074,
      },
      YEAR_UACMAX: {
        Unit: 'V',
        Value: 271,
      },
      YEAR_UDCMAX: {
        Unit: 'V',
        Value: 625.8,
      },
    },
  },
  Head: {
    RequestArguments: {
      DataCollection: 'MinMaxInverterData',
      DeviceClass: 'Inverter',
      DeviceId: '1',
      Scope: 'Device',
    },
    Status: {
      Code: 0,
      Reason: '',
      UserMessage: '',
    },
    Timestamp: '2022-04-18T12:02:59+02:00',
  },
};

const minMaxInverterDataResponseError = {
  Body: {
    Data: {},
  },
  Head: {
    RequestArguments: {
      DataCollection: 'MinMaxInverterData',
      DeviceClass: 'Inverter',
      DeviceId: '1',
      Scope: 'Device',
    },
    Status: {
      Code: 8,
      Reason: 'Transfer timeout.',
      UserMessage: '',
    },
    Timestamp: '2022-04-18T12:23:15+02:00',
  },
};
