import requestAPI from '../utils/api';

export interface IMultiOptionsProperty {
  property: string;
}

export const requestCompanies = (): Promise<NotionData[]> => requestAPI.get('/company');

export const requestProjects = (): Promise<NotionData[]> => requestAPI.get('/project');

export const requestSkillOptions = (params: IMultiOptionsProperty): Promise<NotionSelectOptions> =>
  requestAPI.get('/options', { params });
