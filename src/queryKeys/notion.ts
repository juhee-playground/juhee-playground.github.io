import { IMultiOptionsProperty } from '@/api/notion';

export const notionQueryKeys = {
  projects: () => ['PROJECTS'],
  companies: () => ['COMPANIES'],
  skillOptions: (options: IMultiOptionsProperty) => ['SKILL_OPTIONS', options],
};
