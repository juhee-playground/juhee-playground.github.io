import dayjs from 'dayjs';

// FIXME: utils은 보통 함수들이 들어가 있기 때문에, 파스칼 케이스로 파일을 만들지 않습니다. 또한 tsx는 jsx 문법을 사용하여 export하는 파일의 확장자이기 때문에, util은 .ts로 해도 됩니다.
export function parserPeriod(date: PeriodDate): string {
  const year = dayjs(date.end).diff(date.start, 'year');
  const month = dayjs(date.end).diff(date.start, 'month');

  const numberOfMonths = month - year * 12;

  return `(${[`${year}년`, `${numberOfMonths}개월`].filter(dateItem => !/^0/.test(dateItem)).join(' ')})`;
}
