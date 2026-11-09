const STORAGE_KEY = 'resume.selectedProjectIds';

export const readResumeProjectSelection = (): readonly string[] | null => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.filter((id): id is string => typeof id === 'string');
  } catch {
    return null;
  }
};

export const writeResumeProjectSelection = (projectIds: readonly string[]): void => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(projectIds));
};

export const getDefaultResumeProjectIds = (projects: readonly IProjectData[]): readonly string[] =>
  projects.filter(project => project.isFeatured).map(project => project.id).filter(Boolean);
