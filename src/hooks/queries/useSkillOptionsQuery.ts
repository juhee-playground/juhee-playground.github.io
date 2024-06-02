import { requestSkillOptions } from '@/api/notion';
import { notionQueryKeys } from '@/queryKeys/notion';
import { useQuery } from 'react-query';

export default function useSkillOptionQuery(property: string) {
  return useQuery(notionQueryKeys.skillOptions({ property }), () => requestSkillOptions({ property }), {
    select: data => data.multi_select.options,
  });
}
