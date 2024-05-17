import dayjs from 'dayjs';

export function parserPeriod(date: PeriodDate): string {
  const year = dayjs(date.end).diff(date.start, 'year');
  const month = dayjs(date.end).diff(date.start, 'month');
  const isZero = year !== 0 || month !== 0;
  const noYear = year === 0;
  const numberOfMonths = month - year * 12;
  const noNumberOfMonths = numberOfMonths === 0;
  const period = `${isZero ? `(` : ''}
        ${noYear ? '' : `${year}년`}
        ${noNumberOfMonths ? '' : `${numberOfMonths}개월`}
        ${isZero ? `)` : ''}`;
  return period;
}
