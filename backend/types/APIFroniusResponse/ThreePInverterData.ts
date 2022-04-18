export interface ThreePInverterData {
  Body: {
    Data: {
      IAC_L1: {
        Unit: string;
        Value: number;
      };
      IAC_L2: {
        Unit: string;
        Value: number;
      };
      IAC_L3: {
        Unit: string;
        Value: number;
      };
      UAC_L1: {
        Unit: string;
        Value: number;
      };
      UAC_L2: {
        Unit: string;
        Value: number;
      };
      UAC_L3: {
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

//Templare response ThreePInverterData
const threePInverterData: ThreePInverterData = {
  Body: {
    Data: {
      IAC_L1: {
        Unit: 'A',
        Value: 12.37,
      },
      IAC_L2: {
        Unit: 'A',
        Value: 12.24,
      },
      IAC_L3: {
        Unit: 'A',
        Value: 12.3,
      },
      UAC_L1: {
        Unit: 'V',
        Value: 242.4,
      },
      UAC_L2: {
        Unit: 'V',
        Value: 242.6,
      },
      UAC_L3: {
        Unit: 'V',
        Value: 243.3,
      },
    },
  },
  Head: {
    RequestArguments: {
      DataCollection: '3PInverterData',
      DeviceClass: 'Inverter',
      DeviceId: '1',
      Scope: 'Device',
    },
    Status: {
      Code: 0,
      Reason: '',
      UserMessage: '',
    },
    Timestamp: '2022-04-18T11:58:20+02:00',
  },
};
