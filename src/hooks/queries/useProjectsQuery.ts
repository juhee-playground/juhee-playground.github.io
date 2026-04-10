import { useQuery } from 'react-query';

import { requestProjects } from '@/api/notion';
import { notionQueryKeys } from '@/queryKeys/notion';
import { parseProjectData } from '@/utils/parser';

export default function useProjectsQuery() {
  return useQuery(notionQueryKeys.projects(), () => requestProjects(), {
    select: query =>
      query.map(data =>
        parseProjectData({ ...data.properties, id: data.id }),
      ),
  });
}
