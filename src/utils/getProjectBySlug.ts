import { PROJECTS_SITE, TProject } from '@/data/projects/DB_projects_site';

export const getProjectBySlug = (slug: string): TProject | undefined =>
  PROJECTS_SITE.find((p) => p.slug === slug);
