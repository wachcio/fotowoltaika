import { useEffect, useContext } from 'react';
import axios from 'axios';
// import dayjs from 'dayjs';
import { StoreContext } from '../../store/storeProvider';

export const getDayDetails = async (year, month, day) =>
    axios
        .get(
            `${
                process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_GET_DAY_DETAILS
            }?year=${year}&month=${month}&day=${day}`,
        )
        .then(({ data }) => data);

export const getMonthProduction = async (year, month) =>
    axios
        .get(
            `${
                process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_GET_MONTH_PRODUCTION
            }?year=${year}&month=${month}`,
        )
        .then(({ data }) => data);

export const getYearProduction = async (year) =>
    axios
        .get(
            `${
                process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_GET_YEAR_PRODUCTION
            }?year=${year}`,
        )
        .then(({ data }) => data);

const UpdateAllData = () => {
    const {
        setCommonInverterData,
        setPPPInverterData,
        setStringsCurrentData,
        setMinMaxInverterData,
        // setDayDetails,
        // setTodayPowerRealPACSum,
    } = useContext(StoreContext);

    const getInverterRealtimeDataCID = async () =>
        axios
            .get(
                process.env.REACT_APP_API_BASE_URL +
                    process.env.REACT_APP_GET_INVERTER_REALTIME_DATA_CID,
            )
            .then(({ data }) => data);

    const getInverterRealtimeData3PID = async () =>
        axios
            .get(
                process.env.REACT_APP_API_BASE_URL +
                    process.env.REACT_APP_GET_INVERTER_REALTIME_DATA_3PID,
            )
            .then(({ data }) => data);

    const getMinMaxInverterData = async () =>
        axios
            .get(
                process.env.REACT_APP_API_BASE_URL +
                    process.env.REACT_APP_GET_INVERTER_REALTIME_DATA_MinMaxID,
            )
            .then(({ data }) => data);

    const getStringsCurrentData = async () =>
        axios
            .get(
                process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_GET_STRINGS_CURRENT_DATA,
            )
            .then(({ data }) => data);

    // const getTodayPowerRealPACSum = async () =>
    //     axios
    //         .get(
    //             `${
    //                 process.env.REACT_APP_API_BASE_URL +
    //                 process.env.REACT_APP_GET_TODAY_POWER_REAL_PAC_SUM
    //             }`,
    //         )
    //         .then(({ data }) => data);

    useEffect(async () => {
        setCommonInverterData(await getInverterRealtimeDataCID());
        setPPPInverterData(await getInverterRealtimeData3PID());
        setMinMaxInverterData(await getMinMaxInverterData());
        setStringsCurrentData(await getStringsCurrentData());
    }, []);

    // useEffect(
    //     async () =>
    //         Promise.any([
    //             setCommonInverterData(getInverterRealtimeDataCID()),
    //             setPPPInverterData(getInverterRealtimeData3PID()),
    //             setMinMaxInverterData(getMinMaxInverterData()),
    //             setStringsCurrentData(getStringsCurrentData()),
    //         ]),
    //     [],
    // );
    return null;
};
export default UpdateAllData;
