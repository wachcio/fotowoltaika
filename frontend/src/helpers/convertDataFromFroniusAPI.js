export const convertDataFromFroniusAPI = (value, unit, round = 0, returnKilo = false) => {
    if (!returnKilo) {
        return !value || Number.isNaN(value)
            ? `0${unit || ''}`
            : `${value.toFixed(round)}${unit || ''}`;
    }
    return !value || Number.isNaN(value)
        ? `0${unit || ''}`
        : `${(value / 1000).toFixed(round)}k${unit || ''}`;
};
// export const convertDataFromFroniusAPI = (value, unit, returnKilo = false, round = 0) => {
//     if (!returnKilo) {
//         return !value || Number.isNaN(value) ? `0${unit}` : `${value.toFixed(round)}${unit}`;
//     }
//     return !value || Number.isNaN(value) ? `0${unit}` : `${(value / 1000).toFixed(round)}k${unit}`;
// };
