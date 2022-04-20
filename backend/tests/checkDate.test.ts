import { checkDate } from '../helpers/checkDate';

//checkDate return false when date is OK and is beetween 01-01-2021 from today

test('Check date: 01-01-2022', () => {
  expect(checkDate({ year: 2022, month: 1, day: 1 })).toBeFalsy();
});
