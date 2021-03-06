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
            <p>Warto??ci maksymalne z dzi??:</p>
            <p>Produkcja: {DAY_PMAX}</p>
            <p>Napi??cie AC: {DAY_UACMAX}</p>
            <p>Napi??cie DC: {DAY_UDCMAX}</p>
            <p>Warto??ci maksymalne w tym roku:</p>
            <p>Produkcja: {YEAR_PMAX}</p>
            <p>Napi??cie AC: {YEAR_UACMAX}</p>
            <p>Napi??cie DC: {YEAR_UDCMAX}</p>
            <p>Warto??ci maksymalne od pocz??tku:</p>
            <p>Produkcja: {TOTAL_PMAX}</p>
            <p>Napi??cie AC: {TOTAL_UACMAX}</p>
            <p>Napi??cie DC: {TOTAL_UDCMAX}</p>
        </div>
    );
}

export default MinMaxInverterData;
