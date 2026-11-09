import { useQuery } from 'react-query';

import { requestProjects } from '@/api/notion';
import { notionQueryKeys } from '@/queryKeys/notion';
import { getFeaturedProjects } from '@/utils/getFeaturedProjects';
import { parseProjectData } from '@/utils/parser';

const parseProjects = (query: readonly INotionData[]) =>
  query.map(data => parseProjectData({ ...data.properties, id: data.id }));

export default function useProjectsQuery() {
  return useQuery(notionQueryKeys.projects(), () => requestProjects(), {
    select: parseProjects,
  });
}

/** isFeatured true 프로젝트만 featuredOrder 순으로 반환한다. */
export function useFeaturedProjectsQuery() {
  return useQuery(notionQueryKeys.projects(), () => requestProjects(), {
    select: query => getFeaturedProjects(parseProjects(query)),
  });
}
