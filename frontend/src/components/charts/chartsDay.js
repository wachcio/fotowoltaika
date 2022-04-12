/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import DatePicker from 'react-date-picker';
import { Switch, useCheckboxState } from 'pretty-checkbox-react';
import { StoreContext } from '../../store/storeProvider';
import styles from './charts.module.scss';
import './Calendar.css';
import './DatePicker.css';
import { useStateWithLabel } from '../../helpers/helpers';
import { getDayDetails as updateDayDetails } from '../updateAllData/updateAllData';
import { convertDataFromFroniusAPI } from '../../helpers/convertDataFromFroniusAPI';
// import Arrow from './arrow';

const duration = require('dayjs/plugin/duration');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(duration);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Warsaw');

function Charts() {
    const { dayDetails, setDayDetails } = useContext(StoreContext);
    const [data, setData] = useStateWithLabel('data', []);
    const [biggestDayPAC, setBiggestDayPAC] = useStateWithLabel('biggestDayPAC', 0);
    const [dayToFetch, setDayToFetch] = useStateWithLabel('dayToFetch', new Date());

    const { commonInverterData } = useContext(StoreContext);

    const checkbox = useCheckboxState();

    const location = useLocation();

    const updateDay = async () => {
        if (dayDetails) {
            setData([]);
            await dayDetails.map(async (el) =>
                setData((prev) => [
                    ...prev,
                    {
                        name: 'PowerReal_PAC_Sum',
                        Produkcja: el.PowerReal_PAC_Sum,
                        EnergyReal_WAC_Sum_Produced: el.EnergyReal_WAC_Sum_Produced,
                        EnergyReal_WAC_Sum_Produced_Until_Now:
                            el.EnergyReal_WAC_Sum_Produced_Until_Now,
                        timestamp: el.timestamp,
                    },
                ]),
            );
            setBiggestDayPAC(
                dayDetails.reduce((a, v) => Math.max(a, v.PowerReal_PAC_Sum), -Infinity),
            );
        }
    };

    useEffect(async () => {
        await updateDay();
    }, [dayDetails]);

    useEffect(async () => {
        await setDayDetails(
            await updateDayDetails(
                dayjs(dayToFetch).year(),
                dayjs(dayToFetch).month() + 1,
                dayjs(dayToFetch).date(),
            ),
        );
        // await updateDay();
    }, [dayToFetch]);

    const handleClickChangeDay = async (e, days) => {
        e.preventDefault();

        if (days > 0) {
            if (dayjs(dayToFetch).add(dayjs.duration({ days: 1 })) > dayjs()) {
                return;
            }
            await setDayToFetch(dayjs(dayToFetch).add(dayjs.duration({ days: 1 })));
        } else {
            if (
                dayjs(dayToFetch).subtract(dayjs.duration({ days: 1 })) <
                dayjs(new Date('2021-07-23'))
            ) {
                return;
            }
            await setDayToFetch(dayjs(dayToFetch).subtract(dayjs.duration({ days: 1 })));
        }
    };

    const Arrow = ({ direction }) => (
        <button
            onClick={(e) => {
                handleClickChangeDay(e, direction === 'right' ? 1 : -1);
            }}
            type="button"
            className="uppercase p-2 m-2 flex items-center  max-w-max shadow-sm hover:stroke-current  w-12 h-12"
        >
            <svg
                width="64"
                height="64"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 64 64"
                style={{
                    transform: `${direction === 'left' ? 'rotate(180deg)' : 'rotate(0deg)'}`,
                }}
            >
                <g id="g6" transform="matrix(0.12500006,0,0,0.12109381,1.823203,1.4697608)">
                    <g id="g4">
                        <path
                            d="M 394.8,222.851 186.065,14.116 c -18.821,-18.821 -51.328,-18.821 -68.438,0 -18.82,18.821 -18.82,49.617 0,68.438 L 290.433,257.07 117.628,429.875 c -18.82,18.821 -18.82,49.618 0,68.438 8.555,8.555 22.242,13.687 34.218,13.687 11.976,0 25.665,-5.132 34.219,-13.688 L 394.8,291.288 c 8.555,-8.555 13.688,-22.242 13.688,-34.219 0,-11.976 -5.133,-25.663 -13.688,-34.218 z M 370.847,267.335 163.823,474.36 c -5.133,5.132 -15.398,5.132 -20.531,0 -5.133,-5.132 -5.133,-15.399 0,-20.531 L 328.074,269.047 c 6.844,-6.844 6.844,-17.109 0,-23.953 L 141.581,60.312 c -5.133,-6.844 -5.133,-15.399 0,-20.531 3.422,-3.422 6.844,-5.132 10.266,-5.132 3.422,0 6.844,1.71 10.266,5.132 l 208.735,208.735 c 3.422,3.422 5.132,6.844 5.132,10.266 -1.711,1.709 -3.422,6.843 -5.133,8.553 z"
                            id="path2"
                            fill="#aaa"
                        />
                    </g>
                </g>
            </svg>
        </button>
    );

    const ChangeDate = () => (
        <div className="flex flex-row justify-center items-center">
            <Arrow direction="left" />
            <DatePicker
                onChange={(value) => setDayToFetch(value)}
                value={new Date(dayToFetch)}
                clearIcon={null}
                locale="pl-PL"
                format="dd-MM-yyyy"
                minDate={new Date('2021-07-23')}
                maxDate={new Date()}
            />
            <Arrow direction="right" />
        </div>
    );

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={styles.customTooltip}>
                    {' '}
                    <p className="label">
                        {`${dayjs(payload[0].payload.timestamp).format('HH:mm')}`}
                    </p>
                    <p className="label">{`Produkcja: ${
                        Number(payload[0].value) > 1000
                            ? Number(payload[0].value / 1000).toFixed(2)
                            : Number(payload[0].value).toFixed(2)
                    } ${Number(payload[0].value).toFixed() > 1000 ? 'kWh' : 'Wh'}`}</p>
                    <p className="label">{`Produkcja w watach: ${Number(
                        payload[0].payload.EnergyReal_WAC_Sum_Produced,
                    ).toFixed()}W`}</p>
                    <p className="label">{`Produkcja do teraz: ${
                        payload[0].payload.EnergyReal_WAC_Sum_Produced_Until_Now > 1000
                            ? Number(
                                  payload[0].payload.EnergyReal_WAC_Sum_Produced_Until_Now / 1000,
                              ).toFixed(2)
                            : Number(
                                  payload[0].payload.EnergyReal_WAC_Sum_Produced_Until_Now,
                              ).toFixed(2)
                    }${
                        payload[0].payload.EnergyReal_WAC_Sum_Produced_Until_Now > 1000
                            ? 'kWh'
                            : 'Wh'
                    }`}</p>
                </div>
            );
        }

        return null;
    };

    const ProductionInDay = () => {
        if (!data.length) return null;
        const productionValue =
            location.pathname !== '/'
                ? `${
                      Number(data[data.length - 1].EnergyReal_WAC_Sum_Produced_Until_Now) > 1000
                          ? Number(
                                data[data.length - 1].EnergyReal_WAC_Sum_Produced_Until_Now / 1000,
                            ).toFixed(2)
                          : Number(
                                data[data.length - 1].EnergyReal_WAC_Sum_Produced_Until_Now,
                            ).toFixed(2)
                  } ${
                      Number(
                          data[data.length - 1].EnergyReal_WAC_Sum_Produced_Until_Now,
                      ).toFixed() > 1000
                          ? 'kWh'
                          : 'Wh'
                  }`
                : convertDataFromFroniusAPI(
                      commonInverterData?.Body?.Data?.DAY_ENERGY?.Value,
                      commonInverterData?.Body?.Data?.DAY_ENERGY?.Unit,
                      2,
                      true,
                  );
        if (data.length) {
            return (
                <>
                    <div className={styles.productionInDay}>
                        <p>{productionValue}</p>
                    </div>
                </>
            );
        }
        return null;
    };

    return (
        <>
            {location.pathname !== '/' ? <ChangeDate /> : null}

            <ProductionInDay />
            <ResponsiveContainer width="100%" height={500} className="styles.customTooltip">
                <AreaChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 80,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="0 3 " />
                    <XAxis
                        dataKey="data.timestamp"
                        label={{
                            value: dayDetails
                                ? `${dayjs(dayDetails[0].timestamp).format('YYYY-MM-DD')}`
                                : '',
                            position: 'insideTopRight',
                            offset: 15,
                            fill: '#fff',
                        }}
                    />
                    <YAxis
                        domain={[
                            0,
                            !checkbox.state ? 10000 : Math.ceil(biggestDayPAC / 100) * 100 + 200,
                        ]}
                        stroke="#fff"
                    />
                    <Tooltip content={<CustomTooltip />} />

                    <Area
                        type="monotone"
                        dataKey="Produkcja"
                        stroke="#ffd238"
                        fill="#ffd238"
                        fillOpacity={1}
                    />
                </AreaChart>
            </ResponsiveContainer>
            <Switch shape="fill" color="warning" type="checkbox" {...checkbox}>
                Automatyczna skala wykresu
            </Switch>
        </>
    );
}
export default Charts;
