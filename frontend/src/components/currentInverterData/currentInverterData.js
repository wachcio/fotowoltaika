import { useContext } from 'react';
import dayjs from 'dayjs';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSun,
    faWaveSquare,
    faBolt,
    faSyncAlt,
    faThermometerHalf,
} from '@fortawesome/free-solid-svg-icons';
import { convertDataFromFroniusAPI } from '../../helpers/convertDataFromFroniusAPI';
import { StoreContext } from '../../store/storeProvider';
// import styles from './commonInverterData.module.scss'
fontawesome.library.add(faSun, faWaveSquare, faBolt, faSyncAlt, faThermometerHalf);

function CurrentInverterData() {
    const { commonInverterData } = useContext(StoreContext);
    const { PPPInverterData } = useContext(StoreContext);
    const { stringsCurrentData } = useContext(StoreContext);

    const totalEnergyKWH = convertDataFromFroniusAPI(
        commonInverterData?.Body?.Data?.TOTAL_ENERGY?.Value,
        commonInverterData?.Body?.Data?.TOTAL_ENERGY?.Unit,
        2,
        true,
    );
    const dayEnergyKWH = convertDataFromFroniusAPI(
        commonInverterData?.Body?.Data?.DAY_ENERGY?.Value,
        commonInverterData?.Body?.Data?.DAY_ENERGY?.Unit,
        2,
        true,
    );
    const currentProduction = convertDataFromFroniusAPI(
        commonInverterData?.Body?.Data?.PAC?.Value,
        'W',
    );

    const currentFrequency = convertDataFromFroniusAPI(
        commonInverterData?.Body?.Data?.FAC?.Value,
        'Hz',
    );
    const currentAmperageAC = convertDataFromFroniusAPI(
        commonInverterData?.Body?.Data?.IAC?.Value,
        'A',
        2,
    );
    const currentVoltageAC = convertDataFromFroniusAPI(
        commonInverterData?.Body?.Data?.UAC?.Value,
        'V',
        2,
    );
    const currentAmperageDC = convertDataFromFroniusAPI(
        commonInverterData?.Body?.Data?.IDC?.Value,
        commonInverterData?.Body?.Data?.IDC?.Unit,
        2,
    );
    const currentVoltageDC = convertDataFromFroniusAPI(
        commonInverterData?.Body?.Data?.UDC?.Value,
        commonInverterData?.Body?.Data?.UDC?.Unit,
        2,
    );
    const timestampData =
        !commonInverterData?.Head?.Timestamp || Number.isNaN(commonInverterData?.Head?.Timestamp)
            ? ''
            : `${dayjs(commonInverterData?.Head?.Timestamp).format('YYYY-MM-DD HH:mm:ss')}`;

    const currentVoltageACL1 = convertDataFromFroniusAPI(
        PPPInverterData?.Body?.Data?.UAC_L1?.Value,
        'V',
        2,
    );
    const currentVoltageACL2 = convertDataFromFroniusAPI(
        PPPInverterData?.Body?.Data?.UAC_L2?.Value,
        'V',
        2,
    );
    const currentVoltageACL3 = convertDataFromFroniusAPI(
        PPPInverterData?.Body?.Data?.UAC_L3?.Value,
        'V',
        2,
    );
    const currentAmperageACL1 = convertDataFromFroniusAPI(
        PPPInverterData?.Body?.Data?.IAC_L1?.Value,
        'A',
        2,
    );
    const currentAmperageACL2 = convertDataFromFroniusAPI(
        PPPInverterData?.Body?.Data?.IAC_L2?.Value,
        'A',
        2,
    );
    const currentAmperageACL3 = convertDataFromFroniusAPI(
        PPPInverterData?.Body?.Data?.IAC_L3?.Value,
        'A',
        2,
    );
    const CurrentDCString1 =
        !stringsCurrentData?.Current_DC_String_1 ||
        Number.isNaN(stringsCurrentData?.Current_DC_String_1)
            ? '0A'
            : `${stringsCurrentData?.Current_DC_String_1.toFixed(2)}A`;
    const CurrentDCString2 =
        !stringsCurrentData?.Current_DC_String_2 ||
        Number.isNaN(stringsCurrentData?.Current_DC_String_2)
            ? '0A'
            : `${stringsCurrentData?.Current_DC_String_2.toFixed(2)}A`;
    const VoltageDCString1 =
        !stringsCurrentData?.Voltage_DC_String_1 ||
        Number.isNaN(stringsCurrentData?.Voltage_DC_String_1)
            ? '0V'
            : `${stringsCurrentData?.Voltage_DC_String_1.toFixed(2)}V`;
    const VoltageDCString2 =
        !stringsCurrentData?.Voltage_DC_String_2 ||
        Number.isNaN(stringsCurrentData?.Voltage_DC_String_2)
            ? '0V'
            : `${stringsCurrentData?.Voltage_DC_String_2.toFixed(2)}V`;

    const TemperaturePowerstage =
        !stringsCurrentData?.Temperature_Powerstage ||
        Number.isNaN(stringsCurrentData?.Temperature_Powerstage)
            ? '0°C'
            : `${stringsCurrentData?.Temperature_Powerstage.toFixed(2)}°C`;

    return (
        <div className="currentInverterData">
            <div className="grid grid-cols-2 gap-2 justify-center items-center">
                <FontAwesomeIcon icon={faSun} className="text-3xl mx-4 justify-self-end" />
                <div className=" flex flex-col">
                    <p className="text-l">Teraz: {currentProduction}</p>
                    <p className="text-l">Dziś: {dayEnergyKWH}</p>
                    <p className="text-l">Łącznie: {totalEnergyKWH}</p>
                </div>

                <FontAwesomeIcon icon={faWaveSquare} className="text-3xl mx-4 justify-self-end" />
                <div className=" flex flex-col">
                    <p className="text-l">{currentFrequency}</p>
                </div>
                <div className="flex mx-4 justify-self-end items-center">
                    <FontAwesomeIcon icon={faBolt} className="text-3xl" />
                    <p className="text-3xl">AC</p>
                </div>
                <div className=" flex flex-col">
                    <p className="text-l">
                        {currentAmperageAC}, {currentVoltageAC}
                    </p>
                    <p className="text-l">
                        L1: {currentAmperageACL1}, {currentVoltageACL1}
                    </p>
                    <p className="text-l">
                        L2: {currentAmperageACL2}, {currentVoltageACL2}
                    </p>
                    <p className="text-l">
                        L3: {currentAmperageACL3}, {currentVoltageACL3}
                    </p>
                </div>
                <div className="flex mx-4 justify-self-end items-center">
                    <FontAwesomeIcon icon={faBolt} className="text-3xl" />
                    <p className="text-3xl">DC</p>
                </div>
                <div className=" flex flex-col">
                    <p className="text-l">
                        {currentAmperageDC}, {currentVoltageDC}
                    </p>
                    <p className="text-l">
                        MPP1: {CurrentDCString1}, {VoltageDCString1}
                    </p>
                    <p className="text-l">
                        MPP2: {CurrentDCString2}, {VoltageDCString2}
                    </p>
                </div>

                <FontAwesomeIcon
                    icon={faThermometerHalf}
                    className="text-3xl mx-4 justify-self-end"
                />
                <div className="flex items-center">
                    <p className="text-l">Inwerter: {TemperaturePowerstage}</p>
                </div>

                <FontAwesomeIcon icon={faSyncAlt} className="text-3xl mx-4 justify-self-end" />
                <div className="flex items-center">
                    <p className="text-l">{timestampData}</p>
                </div>
            </div>
        </div>
    );
}

export default CurrentInverterData;
