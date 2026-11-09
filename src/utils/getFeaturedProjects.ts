const MISSING_ORDER = Number.MAX_SAFE_INTEGER;

type TFeaturedProject = {
  readonly isFeatured: boolean;
  readonly featuredOrder: number | null;
};

/** isFeatured true만 featuredOrder 오름차순으로 반환한다. */
export const getFeaturedProjects = <T extends TFeaturedProject>(projects: readonly T[]): T[] =>
  projects
    .filter(project => project.isFeatured)
    .sort((a, b) => (a.featuredOrder ?? MISSING_ORDER) - (b.featuredOrder ?? MISSING_ORDER));
