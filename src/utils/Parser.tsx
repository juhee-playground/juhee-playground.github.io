import { differenceInYears, differenceInMonths } from 'date-fns';

export function parserPeriod(date: PeriodDate): string {
  const year = differenceInYears(new Date(date.end), new Date(date.start));
  const month = differenceInMonths(new Date(date.end), new Date(date.start));
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
