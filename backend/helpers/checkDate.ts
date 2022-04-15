import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);

const checkDate = ({ year, month, day }) => {
  month--;
  return (
    !dayjs({ year, month, day }).isValid() ||
    !day ||
    // !month ||
    !year ||
    day <= 0 ||
    month < 0 ||
    year < 2021 ||
    dayjs(new Date()).diff({
      year,
      month,
      day,
    }) < 0
  );
};
const checkYear = ({ year }) => {
  return (
    !dayjs({ year }).isValid() ||
    !year ||
    year < 2021 ||
    dayjs(new Date()).diff({
      year,
    }) < 0
  );
};
module.exports = { checkDate, checkYear };
