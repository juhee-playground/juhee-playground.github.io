import { useQuery } from 'react-query';

import { requestSkillOptions } from '@/api/notion';
import { notionQueryKeys } from '@/queryKeys/notion';

export default function useSkillOptionQuery(property: string) {
  return useQuery(notionQueryKeys.skillOptions({ property }), () => requestSkillOptions({ property }), {
    select: data => data.multi_select.options,
  });
}
