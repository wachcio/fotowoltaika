export const daysInMonth = (date) => {
    const dt = new Date(date);
    const month = dt.getMonth() + 1;
    const year = dt.getFullYear();

    return new Date(year, month, 0).getDate();
};
