import customAxios from './customAxios';

interface MultiOptionsProperty {
  property: string;
}

export async function getCompanies() {
  const response = await customAxios.get<NotionData[]>('/company');
  return response.data;
}

export async function getProjects() {
  const response = await customAxios.get<NotionData[]>('/project');
  return response.data;
}

export async function getStackOptions(data: MultiOptionsProperty) {
  const response = await customAxios.get<NotionSelectOptions>('/options', { params: data });
  return response.data.multi_select.options;
}

export async function getMainStackOptions() {
  const response = await customAxios.get<SelectProperty[]>('/mainOptions');
  return response.data;
}
