import { useContext } from 'react';
import { convertDataFromFroniusAPI } from '../../helpers/convertDataFromFroniusAPI';
import { StoreContext } from '../../store/storeProvider';
// import styles from './minMaxInverterData.module.scss'

function MinMaxInverterData() {
    const { minMaxInverterData } = useContext(StoreContext);

    const DAY_PMAX = convertDataFromFroniusAPI(
        minMaxInverterData?.Body?.Data?.DAY_PMAX?.Value,
        minMaxInverterData?.Body?.Data?.DAY_PMAX?.Unit,
        2,
    );
    const YEAR_PMAX = convertDataFromFroniusAPI(
        minMaxInverterData?.Body?.Data?.YEAR_PMAX?.Value,
        minMaxInverterData?.Body?.Data?.YEAR_PMAX?.Unit,
        2,
    );
    const TOTAL_PMAX = convertDataFromFroniusAPI(
        minMaxInverterData?.Body?.Data?.TOTAL_PMAX?.Value,
        minMaxInverterData?.Body?.Data?.TOTAL_PMAX?.Unit,
        2,
    );
    const DAY_UACMAX = convertDataFromFroniusAPI(
        minMaxInverterData?.Body?.Data?.DAY_UACMAX?.Value,
        minMaxInverterData?.Body?.Data?.DAY_UACMAX?.Unit,
        2,
    );
    const YEAR_UACMAX = convertDataFromFroniusAPI(
        minMaxInverterData?.Body?.Data?.YEAR_UACMAX?.Value,
        minMaxInverterData?.Body?.Data?.YEAR_UACMAX?.Unit,
        2,
    );
    const TOTAL_UACMAX = convertDataFromFroniusAPI(
        minMaxInverterData?.Body?.Data?.TOTAL_UACMAX?.Value,
        minMaxInverterData?.Body?.Data?.TOTAL_UACMAX?.Unit,
        2,
    );
    const DAY_UDCMAX = convertDataFromFroniusAPI(
        minMaxInverterData?.Body?.Data?.DAY_UDCMAX?.Value,
        minMaxInverterData?.Body?.Data?.DAY_UDCMAX?.Unit,
        2,
    );
    const YEAR_UDCMAX = convertDataFromFroniusAPI(
        minMaxInverterData?.Body?.Data?.YEAR_UDCMAX?.Value,
        minMaxInverterData?.Body?.Data?.YEAR_UDCMAX?.Unit,
        2,
    );
    const TOTAL_UDCMAX = convertDataFromFroniusAPI(
        minMaxInverterData?.Body?.Data?.TOTAL_UDCMAX?.Value,
        minMaxInverterData?.Body?.Data?.TOTAL_UDCMAX?.Unit,
        2,
    );

    return (
        <div className="minMaxInverterData">
            <p>Wartości maksymalne z dziś:</p>
            <p>Produkcja: {DAY_PMAX}</p>
            <p>Napięcie AC: {DAY_UACMAX}</p>
            <p>Napięcie DC: {DAY_UDCMAX}</p>
            <p>Wartości maksymalne w tym roku:</p>
            <p>Produkcja: {YEAR_PMAX}</p>
            <p>Napięcie AC: {YEAR_UACMAX}</p>
            <p>Napięcie DC: {YEAR_UDCMAX}</p>
            <p>Wartości maksymalne od początku:</p>
            <p>Produkcja: {TOTAL_PMAX}</p>
            <p>Napięcie AC: {TOTAL_UACMAX}</p>
            <p>Napięcie DC: {TOTAL_UDCMAX}</p>
        </div>
    );
}

export default MinMaxInverterData;
