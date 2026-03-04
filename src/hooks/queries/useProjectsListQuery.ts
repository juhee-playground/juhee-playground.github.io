import { useQuery } from 'react-query';

import { fetchProjects } from '@/api/projectsApi';
import { projectQueryKeys } from '@/queryKeys/projects';

export default function useProjectsListQuery() {
  return useQuery(
    projectQueryKeys.list(),
    fetchProjects,
    { staleTime: Infinity },
  );
}
