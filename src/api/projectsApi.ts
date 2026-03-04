/**
 * Phase 1: Mock data (local JSON)
 * Phase 2: Replace with Lambda endpoints
 *   GET /projects        → fetchProjects
 *   GET /projects/:slug  → fetchProjectBySlug
 */
import { PROJECTS_SITE, TProject } from '@/data/projects/DB_projects_site';

export type TProjectListItem = Pick<TProject, 'slug' | 'title' | 'tagline' | 'status' | 'tags' | 'links'>;

export const fetchProjects = (): Promise<TProjectListItem[]> =>
  Promise.resolve(
    PROJECTS_SITE.map(({ slug, title, tagline, status, tags, links }) => ({
      slug,
      title,
      tagline,
      status,
      tags,
      links,
    })),
  );

export const fetchProjectBySlug = (slug: string): Promise<TProject | undefined> =>
  Promise.resolve(PROJECTS_SITE.find(p => p.slug === slug));
