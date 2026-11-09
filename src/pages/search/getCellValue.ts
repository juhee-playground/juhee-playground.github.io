import type { TSearchColumnId } from './columns';

const joinSelectNames = (items: readonly ISelectProperty[] | undefined): string =>
  (items ?? []).map(item => item.name).join(', ');

const joinStrings = (items: readonly string[] | undefined): string => (items ?? []).join(', ');

const asCellText = (value: unknown): string => (typeof value === 'string' ? value : '');

export const getCellText = (project: IProjectData, columnId: TSearchColumnId): string => {
  switch (columnId) {
    case 'name':
      return asCellText(project.name);
    case 'domain':
      return joinSelectNames(project.domain);
    case 'keywords':
      return joinSelectNames(project.keywords);
    case 'mainSkills':
      return joinSelectNames(project.mainSkills);
    case 'techStack':
      return joinStrings(project.techStack);
    case 'period':
      return asCellText(project.period);
    case 'role':
      return asCellText(project.role);
    case 'summary':
      return asCellText(project.summary);
    case 'description':
      return asCellText(project.description);
    case 'details':
      return asCellText(project.details);
    case 'background':
      return asCellText(project.background);
    case 'isVisible':
      return project.isVisible ? 'true' : 'false';
    case 'projectType':
      return joinSelectNames(project.projectType);
    case 'isFeatured':
      return project.isFeatured ? 'true' : 'false';
    case 'featuredOrder':
      return String(project.featuredOrder ?? '');
    case 'hero':
      return asCellText(project.hero);
    case 'problem':
      return asCellText(project.problem);
    case 'impact':
      return asCellText(project.impact);
    case 'keyContributions':
      return asCellText(project.keyContributions);
    case 'architecture':
      return asCellText(project.architecture);
    case 'numberOfParticipants':
      return String(project.numberOfParticipants ?? '');
    case 'participationRate':
      return String(project.participationRate ?? '');
    case 'companyId':
      return asCellText(project.companyId);
    default:
      return '';
  }
};

export const getCellTags = (
  project: IProjectData,
  columnId: TSearchColumnId,
): readonly ISelectProperty[] | readonly string[] => {
  switch (columnId) {
    case 'domain':
      return project.domain ?? [];
    case 'keywords':
      return project.keywords ?? [];
    case 'projectType':
      return project.projectType ?? [];
    case 'mainSkills':
      return project.mainSkills ?? [];
    case 'techStack':
      return project.techStack ?? [];
    default:
      return [];
  }
};
