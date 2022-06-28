/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { createContext } from 'react';
import { useStateWithLabel } from '../helpers/helpers';

import Message from '../components/message/message';

// const LOADS_DATA = [];
export const StoreContext = createContext(null);

const StoreProvider = (props) => {
    // Router links
    const routerLinks = [
        { name: 'Start', path: '/', exact: true },
        { name: 'Wykres dzienny', path: '/day' },
        { name: 'Wykres miesięczny', path: '/month' },
        { name: 'Wykres roczny', path: '/year' },
        { name: 'Wartości maksymalne', path: '/max' },
    ];

    // Load
    const [loadData, setLoadData] = useStateWithLabel('loadData', null);
    const [takeLoad, setTakeLoad] = useStateWithLabel('takeLoad', false);

    // Menu
    const [isOpenMenu, setIsOpenMenu] = useStateWithLabel('isOpenMenu', false);

    // User data
    const [userData, setUserData] = useStateWithLabel('userData', {
        username: null,
        email: null,
        isLogged: false,
        token: null,
    });

    // Message
    const [isVisibleMessage, setIsVisibleMessage] = useStateWithLabel('isVisibleMessage', false);
    const [messageText, setMessageText] = useStateWithLabel('messageText', '');
    const [isMessageAlert, setIsMessageAlert] = useStateWithLabel('isMessageAlert', false);

    // PV data
    const [commonInverterData, setCommonInverterData] = useStateWithLabel(
        'commonInverterData',
        null,
    );
    const [PPPInverterData, setPPPInverterData] = useStateWithLabel('PPPInverterData', null);
    const [minMaxInverterData, setMinMaxInverterData] = useStateWithLabel(
        'minMaxInverterData',
        null,
    );
    const [stringsCurrentData, setStringsCurrentData] = useStateWithLabel(
        'stringsCurrentData',
        null,
    );
    const [dayDetails, setDayDetails] = useStateWithLabel('dayDetails', null);
    // const [todayPowerRealPACSum, setTodayPowerRealPACSum] = useStateWithLabel(
    //     'todayPowerRealPACSum',
    //     null,
    // );
    const [monthProduction, setMonthProduction] = useStateWithLabel('monthDetails', null);
    const [yearProduction, setYearProduction] = useStateWithLabel('yearDetails', null);

    const showMessage = (text, isAlert) => {
        setMessageText(text);
        setIsMessageAlert(isAlert);
        setIsVisibleMessage(true);

        setTimeout(() => {
            setIsVisibleMessage(false);
        }, 5000);
    };

    return (
        <StoreContext.Provider
            value={{
                loadData,
                setLoadData,
                takeLoad,
                setTakeLoad,
                userData,
                setUserData,
                showMessage,
                routerLinks,
                setIsOpenMenu,
                isOpenMenu,
                commonInverterData,
                setCommonInverterData,
                PPPInverterData,
                setPPPInverterData,
                minMaxInverterData,
                setMinMaxInverterData,
                stringsCurrentData,
                setStringsCurrentData,
                dayDetails,
                setDayDetails,
                // todayPowerRealPACSum,
                // setTodayPowerRealPACSum,
                monthProduction,
                setMonthProduction,
                yearProduction,
                setYearProduction,
            }}
        >
            {isVisibleMessage ? <Message message={messageText} alert={isMessageAlert} /> : ''}
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
