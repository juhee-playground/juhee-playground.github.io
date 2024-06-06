import { useQuery } from 'react-query';

import { requestCompanies } from '@/api/notion';
import { notionQueryKeys } from '@/queryKeys/notion';

export default function useCompaniesQuery() {
  return useQuery(notionQueryKeys.companies(), () => requestCompanies(), {
    select: query =>
      query.map(data => {
        return {
          ...data.properties,
          id: data.id,
        };
      }),
  });
}
