/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart, XAxis, Bar, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import DatePicker from 'react-date-picker';
import { StoreContext } from '../../store/storeProvider';
import styles from './charts.module.scss';
import './Calendar.css';
import './DatePicker.css';
import { useStateWithLabel } from '../../helpers/helpers';
import { getMonthProduction } from '../updateAllData/updateAllData';
import { daysInMonth } from '../../helpers/daysInMonth';
// import Arrow from './arrow';

const duration = require('dayjs/plugin/duration');
const timezone = require('dayjs/plugin/timezone');

require('dayjs/locale/pl');

dayjs.extend(duration);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Warsaw');
dayjs.locale('pl');

function MonthProduction() {
    const { monthProduction, setMonthProduction } = useContext(StoreContext);
    const [data, setData] = useStateWithLabel('data', []);
    const [, setBiggestDayPAC] = useStateWithLabel('biggestDayPAC', 0);
    const [monthToFetch, setMonthToFetch] = useStateWithLabel('monthToFetch', new Date());

    const location = useLocation();

    const updateMonth = async () => {
        if (monthProduction) {
            setData([]);
            await monthProduction.map(async (el) =>
                setData((prev) => [
                    ...prev,
                    {
                        Day: el.Day,
                        Production: el.Production / 1000,
                    },
                ]),
            );

            if (monthProduction.length < daysInMonth(monthToFetch)) {
                if (monthProduction[0].Day === 1) {
                    // eslint-disable-next-line no-plusplus
                    for (let i = monthProduction.length + 1; i <= daysInMonth(monthToFetch); i++) {
                        setData((prev) => [
                            ...prev,
                            {
                                Day: i,
                                Production: 0,
                            },
                        ]);
                    }
                }
                if (monthProduction[0].Day > 1) {
                    const arr = [];
                    // eslint-disable-next-line no-plusplus
                    for (let i = monthProduction[0].Day - 1; i > 0; i--) {
                        arr.unshift({
                            Day: i,
                            Production: 0,
                        });
                    }
                    setData((prev) => [...arr, ...prev]);
                }
            }

            setBiggestDayPAC(
                monthProduction.reduce((a, v) => Math.max(a, v.Production), -Infinity),
            );
        } else {
            setData([
                {
                    Day: 1,
                    Production: 0,
                },
            ]);
        }
    };

    useEffect(async () => {
        await updateMonth();
    }, [monthProduction]);

    useEffect(async () => {
        await setMonthProduction(
            await getMonthProduction(
                dayjs(monthToFetch).year(),
                dayjs(monthToFetch).month() + 1,
                dayjs(monthToFetch).date(),
            ),
        );
        // await updateDay();
    }, [monthToFetch]);

    const handleClickChangeMonth = async (e, month) => {
        e.preventDefault();

        if (month > 0) {
            if (dayjs(monthToFetch).add(1, 'month').startOf('day') > dayjs()) {
                return;
            }
            await setMonthToFetch(dayjs(monthToFetch).add(1, 'month').endOf('day'));
        } else {
            if (
                dayjs(monthToFetch).subtract(1, 'month').add(5, 'hours') <
                dayjs(new Date('2021-07-01'))
            ) {
                return;
            }

            await setMonthToFetch(dayjs(monthToFetch).subtract(1, 'month').startOf('month'));
        }
    };

    const Arrow = ({ direction }) => (
        <button
            onClick={(e) => {
                handleClickChangeMonth(e, direction === 'right' ? 1 : -1);
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
                onChange={(value) => setMonthToFetch(value)}
                value={new Date(monthToFetch)}
                clearIcon={null}
                locale="pl-PL"
                format="MM-yyyy"
                minDate={new Date('2021-07-23')}
                maxDate={new Date()}
                calendarIcon={null}
            />
            <Arrow direction="right" />
        </div>
    );

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={styles.customTooltip}>
                    {' '}
                    <p className="label">{`Dzień: ${payload[0].payload.Day}`}</p>
                    <p className="label">{`Produkcja: ${
                        Number(payload[0].value) > 1000
                            ? Number(payload[0].value / 1000).toFixed(2)
                            : Number(payload[0].value).toFixed(2)
                    } ${Number(payload[0].value) > 1000 ? 'kWh' : 'kWh'}`}</p>
                </div>
            );
        }

        return null;
    };

    const ProductionInMonth = () => {
        if (!data.length) return null;

        const production = Number(data.reduce((a, v) => a + v.Production, 0)).toFixed(2);

        return (
            <>
                <div className={styles.productionInDay}>
                    <p>{`${production}kWh`}</p>
                </div>
            </>
        );
    };

    return (
        <>
            {location.pathname !== '/' ? <ChangeDate /> : null}

            <ProductionInMonth />
            <ResponsiveContainer width="100%" height={500} className="styles.customTooltip">
                <BarChart
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
                        dataKey="Day"
                        label={{
                            value: monthProduction
                                ? `${dayjs(monthToFetch).format('MMMM YYYY')}`
                                : '',
                            position: 'insideTopRight',
                            offset: 30,
                            fill: '#fff',
                        }}
                    />
                    <YAxis domain={[0, 80]} stroke="#fff" />

                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        type="monotone"
                        dataKey="Production"
                        stroke="#ffd238"
                        fill="#ffd238"
                        fillOpacity={1}
                    />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}
export default MonthProduction;
