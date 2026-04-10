import { useQuery } from 'react-query';

import { requestCompanies } from '@/api/notion';
import { notionQueryKeys } from '@/queryKeys/notion';
import { parseCompanyData } from '@/utils/parser';
import dayjs from 'dayjs';
import { COMPANY_COLORS, STACK_COLORS } from '@/constants/dashboard';


export default function useCompaniesQuery() {
  return useQuery(notionQueryKeys.companies(), () => requestCompanies(), {
    select: query =>
      query.map(data =>
        parseCompanyData({ ...data.properties, id: data.id, icon: data.icon }),
      )
  });
}

export function useCompanyTimelineQuery() {
  const query = useCompaniesQuery();

  const data: ITask[] = (query.data ?? [])
    .filter(c => c.type === 'C')
    .sort((a, b) => a.order - b.order)
    .map(c => ({
      name: c.name,
      startDate: c.startDate,
      endDate: c.endDate ?? dayjs().format('YYYY-MM-DD'),
      color: COMPANY_COLORS[c.name] ?? STACK_COLORS.react,
    }));

  return {
    ...query,
    data,
  };
}
