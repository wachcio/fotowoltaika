import { checkDate } from '../helpers/checkDate';

//checkDate return false when date is OK and is beetween 01-01-2021 from today

test('Check date: 01-01-2022', () => {
  expect(checkDate({ year: 2022, month: 1, day: 1 })).toBeFalsy();
});
test('Check date: 01-01-2021', () => {
  expect(checkDate({ year: 2021, month: 1, day: 1 })).toBeFalsy();
});
test('Check date: 01-01-2020', () => {
  expect(checkDate({ year: 2020, month: 1, day: 1 })).toBeTruthy();
});
test('Check date: 00-01-2020', () => {
  expect(checkDate({ year: 2020, month: 1, day: 0 })).toBeTruthy();
});
test('Check date: 00-01-20200', () => {
  expect(checkDate({ year: 20200, month: 1, day: 0 })).toBeTruthy();
});
