import { getCareerYears } from './getCareerYears';

describe('getCareerYears', () => {
  it('실제 재직 기간만 합산한다 (공백 제외)', () => {
    const years = getCareerYears(
      [
        { startDate: '2020-01-01', endDate: '2022-01-01' },
        { startDate: '2023-01-01', endDate: '2026-01-01' },
      ],
      '2026-03-01',
    );

    // 2년 + 3년 = 5년 (첫 입사~오늘 6년이 아님)
    expect(years).toBe(5);
  });

  it('재직중이면 endDate 대신 현재를 사용한다', () => {
    const years = getCareerYears(
      [{ startDate: '2024-01-01', endDate: null }],
      '2026-01-01',
    );

    expect(years).toBe(2);
  });

  it('겹치는 재직 구간은 한 번만 센다', () => {
    const years = getCareerYears(
      [
        { startDate: '2020-01-01', endDate: '2023-01-01' },
        { startDate: '2022-01-01', endDate: '2024-01-01' },
      ],
      '2026-01-01',
    );

    expect(years).toBe(4);
  });

  it('유효한 날짜가 없으면 0을 반환한다', () => {
    expect(getCareerYears([{ startDate: '' }], '2026-03-01')).toBe(0);
  });
});
