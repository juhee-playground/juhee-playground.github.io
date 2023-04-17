import customAxios from './customAxios';

export async function getCompanies() {
  const response = await customAxios.get<NotionData[]>('/company');
  return response.data;
}

export async function getProjects() {
  const response = await customAxios.get<NotionData[]>('/project');
  return response.data;
}

export async function getStackOptions() {
  const response = await customAxios.get<SelectProperty[]>('/options');
  return response.data;
}

export async function getRoleOptions() {
  const response = await customAxios.get<SelectProperty[]>('/multiOptions');
  return response.data;
}
