import customAxios from './customAxios';

export async function getCompanies() {
  const response = await customAxios.get<NotionData[]>('/company');
  return response.data;
}

export async function getProjects() {
  const response = await customAxios.get<NotionData[]>('/project');
  return response.data;
}
