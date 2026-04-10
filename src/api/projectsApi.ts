/**
 * Phase 1: Mock data (local JSON)
 * Phase 2: Replace with Lambda endpoints
 *   GET /projects        → fetchProjects
 *   GET /projects/:slug  → fetchProjectBySlug
 */
import { PROJECTS_SITE, Project } from '@/data/projects/DB_projects_site';

export type TProjectListItem = Pick<Project, 'slug' | 'name' | 'hero' | 'techStack' | 'period' | 'url'>;

export const fetchProjects = (): Promise<TProjectListItem[]> =>
  Promise.resolve(
    PROJECTS_SITE.map(({ slug, name, hero, techStack, period, url }) => ({
      slug,
      name,
      hero,
      techStack,
      period,
      url,
    })),
  );

export const fetchProjectBySlug = (slug: string): Promise<Project | undefined> =>
  Promise.resolve(PROJECTS_SITE.find(p => p.slug === slug));
