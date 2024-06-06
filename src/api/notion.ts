import requestAPI from '../utils/api';

export interface IMultiOptionsProperty {
  property: string;
}

export const requestCompanies = (): Promise<INotionData[]> => requestAPI.get('/company');

export const requestProjects = (): Promise<INotionData[]> => requestAPI.get('/project');

export const requestSkillOptions = (params: IMultiOptionsProperty): Promise<INotionSelectOptions> =>
  requestAPI.get('/options', { params });
