import type { ISearchColumn } from './columns';
import { getCellText } from './getCellValue';

const escapeCsvCell = (value: string): string => {
  const normalized = value.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  if (/[",\n]/.test(normalized)) {
    return `"${normalized.replace(/"/g, '""')}"`;
  }
  return normalized;
};

export const buildFilteredCsv = (
  projects: readonly IProjectData[],
  columns: readonly ISearchColumn[],
  companyNameById: Readonly<Record<string, string>>,
): string => {
  const header = columns.map(column => escapeCsvCell(column.label)).join(',');
  const rows = projects.map(project =>
    columns
      .map(column => {
        const text =
          column.id === 'companyId'
            ? companyNameById[project.companyId] || getCellText(project, column.id)
            : getCellText(project, column.id);
        return escapeCsvCell(text);
      })
      .join(','),
  );

  return [header, ...rows].join('\n');
};
