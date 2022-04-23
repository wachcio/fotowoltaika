import { checkDate } from '../helpers/checkDate';

//checkDate return false when date is OK and is beetween 01-01-2021 from today

test('Check date: 01-01-2022', () => {
  expect(checkDate({ year: 2022, month: 1, day: 1 })).toBe(false);
});
test('Check date: 01-01-2021', () => {
  expect(checkDate({ year: 2021, month: 1, day: 1 })).toBe(false);
});
test('Check date: 01-01-2020', () => {
  expect(checkDate({ year: 2020, month: 1, day: 1 })).toBe(true);
});
test('Check date: 00-01-2020', () => {
  expect(checkDate({ year: 2020, month: 1, day: 0 })).toBe(true);
});
test('Check date: 00-01-2022', () => {
  expect(checkDate({ year: 2022, month: 1, day: 0 })).toBe(true);
});
test('Check date: 01-00-2022', () => {
  expect(checkDate({ year: 2022, month: 0, day: 1 })).toBe(true);
});
test('Check date: 01-01-2033', () => {
  expect(checkDate({ year: 2023, month: 1, day: 1 })).toBe(true);
});
test('Check today', () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDay();

  expect(checkDate({ year, month, day })).toBe(false);
});

test('Check date: year is string', () => {
  expect(checkDate({ year: 'xx' as any, month: 1, day: 1 })).toBe(true);
});
test('Check date: month is string', () => {
  expect(checkDate({ year: 2022, month: 'xx' as any, day: 1 })).toBe(true);
});
test('Check date: day is string', () => {
  expect(checkDate({ year: 2022, month: 1, day: '10' as any })).toBe(true);
});

//checkYear
test('Check year: year is lower than 2021', () => {
  expect(checkDate({ year: 2020, month: 1, day: 10 })).toBe(true);
});
test('Check year: year is 2021', () => {
  expect(checkDate({ year: 2021, month: 1, day: 10 })).toBe(false);
});
test('Check year: year is 2022', () => {
  expect(checkDate({ year: 2022, month: 1, day: 10 })).toBe(false);
});

test('Check year: year is 2031', () => {
  expect(checkDate({ year: 2031, month: 1, day: 10 })).toBe(true);
});
