export const projectQueryKeys = {
  list: () => ['PROJECTS_SITE'] as const,
  detail: (slug: string) => ['PROJECT_SITE', slug] as const,
};
