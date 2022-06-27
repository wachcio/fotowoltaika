import * as dayjs from 'dayjs';

//convertion duration in second to human format - Hours, minutes and seconds
export const fancyTimeFormat = (
  duration: number,
  dateToFetch: string,
): string => {
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  let res = '';

  if (hrs === 0) {
    res += `00:${mins < 10 ? '0' : ''}`;
  }

  if (hrs > 0) {
    if (hrs < 10) {
      res += `0${hrs}:${mins < 10 ? '0' : ''}`;
    } else {
      res += `${hrs}:${mins < 10 ? '0' : ''}`;
    }
  }

  res += `${mins}`;

  res = `${dayjs(dateToFetch).format('YYYY-MM-DD ') + res}:00`;
  return res;
};
