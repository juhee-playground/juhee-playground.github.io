import { PROJECTS_SITE, Project } from '@/data/projects/DB_projects_site';

export const getProjectBySlug = (slug: string): Project | undefined =>
  PROJECTS_SITE.find((p) => p.slug === slug);
