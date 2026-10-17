import { PROJECTS_SITE, ISiteProject } from '@/data/projects/DB_projects_site';

export const getProjectBySlug = (slug: string): ISiteProject | undefined =>
  PROJECTS_SITE.find((p) => p.slug === slug);
