type TCompanyPeriod = {
  readonly startDate: string;
  readonly endDate?: string | null;
};

type TInterval = {
  readonly start: number;
  readonly end: number;
};

const toValidDate = (value: string | Date): Date | null => {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const toInterval = (
  company: TCompanyPeriod,
  now: Date,
): TInterval | null => {
  const start = toValidDate(company.startDate);
  if (!start) return null;

  const end = toValidDate(company.endDate ?? now) ?? now;
  if (end.getTime() < start.getTime()) return null;

  return { start: start.getTime(), end: end.getTime() };
};

/** 겹치는 재직 구간을 하나로 합친다. */
const mergeIntervals = (intervals: readonly TInterval[]): readonly TInterval[] => {
  if (intervals.length === 0) return [];

  const sorted = [...intervals].sort((a, b) => a.start - b.start);

  return sorted.reduce<TInterval[]>((merged, current) => {
    const last = merged[merged.length - 1];
    if (!last || current.start > last.end) {
      return [...merged, current];
    }

    return [
      ...merged.slice(0, -1),
      { start: last.start, end: Math.max(last.end, current.end) },
    ];
  }, []);
};

const countCalendarMonths = (startMs: number, endMs: number): number => {
  const start = new Date(startMs);
  const end = new Date(endMs);
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) -
    (end.getDate() < start.getDate() ? 1 : 0);

  return Math.max(0, months);
};

/**
 * 회사 재직 기간(start~end, end 없으면 현재)을 합산한 연차.
 * 사이드 프로젝트(type T)는 호출 전에 제외한다.
 */
export const getCareerYears = (
  companies: readonly TCompanyPeriod[],
  nowInput: string | Date = new Date(),
): number => {
  const now = toValidDate(nowInput);
  if (!now) return 0;

  const intervals = mergeIntervals(
    companies
      .map(company => toInterval(company, now))
      .filter((interval): interval is TInterval => interval !== null),
  );

  const totalMonths = intervals.reduce(
    (sum, interval) => sum + countCalendarMonths(interval.start, interval.end),
    0,
  );

  return Math.floor(totalMonths / 12);
};
