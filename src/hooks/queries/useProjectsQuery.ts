import { useQuery } from 'react-query';

import { requestProjects } from '@/api/notion';
import { notionQueryKeys } from '@/queryKeys/notion';

export default function useProjectsQuery() {
  return useQuery(notionQueryKeys.projects(), () => requestProjects(), {
    select: query =>
      query.map(data => {
        return {
          ...data.properties,
          id: data.id,
        };
      }),
  });
}
