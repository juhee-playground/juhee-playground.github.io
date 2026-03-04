import { useQuery } from 'react-query';

import { fetchProjectBySlug } from '@/api/projectsApi';
import { projectQueryKeys } from '@/queryKeys/projects';

export default function useProjectDetailQuery(slug: string | undefined) {
  return useQuery(
    projectQueryKeys.detail(slug ?? ''),
    () => fetchProjectBySlug(slug!),
    { enabled: !!slug, staleTime: Infinity },
  );
}
