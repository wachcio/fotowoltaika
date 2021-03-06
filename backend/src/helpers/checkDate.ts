import * as dayjs from 'dayjs';
import * as objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);

interface checkDateParameter {
  year: number;
  month: number;
  day: number;
}

interface checkYear {
  year: number;
}

export const checkDate = ({
  year,
  month,
  day,
}: checkDateParameter): boolean => {
  if (
    typeof year != 'number' ||
    typeof month != 'number' ||
    typeof day != 'number'
  )
    return false;
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day))
    return false;
  month--;
  return !(
    !dayjs(new Date(year, month, day)).isValid() ||
    !day ||
    // !month ||
    !year ||
    day <= 0 ||
    month < 0 ||
    year < 2021 ||
    dayjs(new Date()).diff(new Date(year, month, day)) < 0
  );
};
export const checkYear = ({ year }: checkYear): boolean => {
  if (typeof year != 'number' || Number.isNaN(year)) return false;

  return !(
    !dayjs(new Date(year)).isValid() ||
    !year ||
    year < 2021 ||
    dayjs(new Date().getFullYear()).diff(new Date(year)) < 0
  );
};
