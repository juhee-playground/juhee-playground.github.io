type TTagCount = {
  readonly name: string;
  readonly count: number;
};

const sortTagCounts = (counts: Record<string, number>): TTagCount[] =>
  Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

const countSelectTags = (
  projects: readonly IProjectData[],
  pick: (project: IProjectData) => readonly ISelectProperty[],
): TTagCount[] => {
  const counts = projects.reduce<Record<string, number>>((acc, project) => {
    pick(project).forEach(tag => {
      acc[tag.name] = (acc[tag.name] ?? 0) + 1;
    });
    return acc;
  }, {});

  return sortTagCounts(counts);
};

const countStringTags = (
  projects: readonly IProjectData[],
  pick: (project: IProjectData) => readonly string[],
): TTagCount[] => {
  const counts = projects.reduce<Record<string, number>>((acc, project) => {
    pick(project).forEach(name => {
      if (!name) return;
      acc[name] = (acc[name] ?? 0) + 1;
    });
    return acc;
  }, {});

  return sortTagCounts(counts);
};

export const getProjectTechNames = (project: IProjectData): readonly string[] => {
  const names = [
    ...(project.mainSkills ?? []).map(tag => tag.name),
    ...(project.skills ?? []).map(tag => tag.name),
    ...(project.techStack ?? []),
  ].filter(Boolean);

  return [...new Set(names)];
};

export const buildKeywordCounts = (projects: readonly IProjectData[]): TTagCount[] =>
  countSelectTags(projects, project => project.keywords ?? []);

export const buildDomainCounts = (projects: readonly IProjectData[]): TTagCount[] =>
  countSelectTags(projects, project => project.domain ?? []);

export const buildTechCounts = (projects: readonly IProjectData[]): TTagCount[] =>
  countStringTags(projects, getProjectTechNames);

export const buildCompanyCounts = (
  projects: readonly IProjectData[],
  companyNameById: Readonly<Record<string, string>>,
): TTagCount[] =>
  countStringTags(projects, project => {
    const companyName = companyNameById[project.companyId] || project.companyId;
    return companyName ? [companyName] : [];
  });

export const buildVisibilityCounts = (projects: readonly IProjectData[]): TTagCount[] =>
  countStringTags(projects, project => [project.isVisible ? 'true' : 'false']);

export const buildFeaturedCounts = (projects: readonly IProjectData[]): TTagCount[] =>
  countStringTags(projects, project => [project.isFeatured ? 'true' : 'false']);

export const buildProjectTypeCounts = (projects: readonly IProjectData[]): TTagCount[] =>
  countSelectTags(projects, project => project.projectType ?? []);
