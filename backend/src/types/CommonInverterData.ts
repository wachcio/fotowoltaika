export interface CommonInverterDataFroniusResponse {
  Body: {
    Data: {
      DAY_ENERGY: {
        Unit: string;
        Value: number;
      };
      DeviceStatus: {
        ErrorCode: number;
        LEDColor: number;
        LEDState: number;
        MgmtTimerRemainingTime: number;
        StateToReset: boolean;
        StatusCode: number;
      };
      FAC?: {
        Unit: string;
        Value: number;
      };
      IAC?: {
        Unit: string;
        Value: number;
      };
      IDC: {
        Unit: string;
        Value: number;
      };
      PAC?: {
        Unit: string;
        Value: number;
      };
      TOTAL_ENERGY: {
        Unit: string;
        Value: number;
      };
      UAC?: {
        Unit: string;
        Value: number;
      };
      UDC: {
        Unit: string;
        Value: number;
      };
      YEAR_ENERGY: {
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

// Template response CommonInverterData
const commonInverterDataResponse: CommonInverterDataFroniusResponse = {
  Body: {
    Data: {
      DAY_ENERGY: {
        Unit: 'Wh',
        Value: 26972,
      },
      DeviceStatus: {
        ErrorCode: 0,
        LEDColor: 2,
        LEDState: 0,
        MgmtTimerRemainingTime: -1,
        StateToReset: false,
        StatusCode: 7,
      },
      FAC: {
        Unit: 'Hz',
        Value: 49.99,
      },
      IAC: {
        Unit: 'A',
        Value: 36.63,
      },
      IDC: {
        Unit: 'A',
        Value: 18.35,
      },
      PAC: {
        Unit: 'W',
        Value: 8913,
      },
      TOTAL_ENERGY: {
        Unit: 'Wh',
        Value: 6736640,
      },
      UAC: {
        Unit: 'V',
        Value: 242.4,
      },
      UDC: {
        Unit: 'V',
        Value: 491.7,
      },
      YEAR_ENERGY: {
        Unit: 'Wh',
        Value: 2824037,
      },
    },
  },
  Head: {
    RequestArguments: {
      DataCollection: 'CommonInverterData',
      DeviceClass: 'Inverter',
      DeviceId: '1',
      Scope: 'Device',
    },
    Status: {
      Code: 0,
      Reason: '',
      UserMessage: '',
    },
    Timestamp: '2022-04-18T11:46:51+02:00',
  },
};

const commonInterfaceDataAfterProduction: CommonInverterDataFroniusResponse = {
  Body: {
    Data: {
      DAY_ENERGY: {
        Unit: 'Wh',
        Value: 64730,
      },
      DeviceStatus: {
        ErrorCode: 307,
        LEDColor: 1,
        LEDState: 0,
        MgmtTimerRemainingTime: 16,
        StateToReset: false,
        StatusCode: 3,
      },
      IDC: {
        Unit: 'A',
        Value: 0,
      },
      TOTAL_ENERGY: {
        Unit: 'Wh',
        Value: 6774410,
      },
      UDC: {
        Unit: 'V',
        Value: 18.1,
      },
      YEAR_ENERGY: {
        Unit: 'Wh',
        Value: 2861802.5,
      },
    },
  },
  Head: {
    RequestArguments: {
      DataCollection: 'CommonInverterData',
      DeviceClass: 'Inverter',
      DeviceId: '1',
      Scope: 'Device',
    },
    Status: {
      Code: 0,
      Reason: '',
      UserMessage: '',
    },
    Timestamp: '2022-04-18T22:04:16+02:00',
  },
};
