import dayjs from 'dayjs';

const COUNT_OF_MONTH = 12;

export function parserPeriod(date: IPeriodDate): string {
  const year = dayjs(date.end).diff(date.start, 'year');
  const month = dayjs(date.end).diff(date.start, 'month');

  const numberOfMonths = month - year * COUNT_OF_MONTH;

  return `(${[`${year}년`, `${numberOfMonths}개월`].filter(dateItem => !/^0/.test(dateItem)).join(' ')})`;
}
