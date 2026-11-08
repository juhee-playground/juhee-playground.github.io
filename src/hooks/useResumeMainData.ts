import { useMemo } from 'react';

import COMPANY_DATA from '@/data/DB_company.json';
import PROJECT_DATA from '@/data/DB_project.json';
import DB_SKILL from '@/data/DB_skill.json';

import useCompaniesQuery from '@/hooks/queries/useCompaniesQuery';
import useProjectsQuery from '@/hooks/queries/useProjectsQuery';
import useSkillOptionQuery from '@/hooks/queries/useSkillOptionsQuery';

import { parseCompanyData, parseProjectData } from '@/utils/parser';

const DB_COMPANY_DATAS = (COMPANY_DATA as ICompanyProperties[]).map(company => parseCompanyData(company));
const DB_PROJECT_DATAS = (PROJECT_DATA as IProjectProperties[]).map(project => parseProjectData(project));

const ASCENDING_ORDER = 1;
const DESCENDING_ORDER = -1;

interface IUseResumeMainDataProps {
  selectedCompanies: string[] | undefined;
  selectedSkillOptions: string[] | undefined;
  selectedProjectTypes: string[] | undefined;
  selectedProjectIds: readonly string[] | undefined;
  sortValue: string;
}

const getProjectTypeNames = (project: IProjectData): readonly string[] =>
  (project.projectType ?? []).map(tag => tag.name);

export default function useResumeMainData({
  selectedCompanies,
  selectedSkillOptions,
  selectedProjectTypes,
  selectedProjectIds,
  sortValue,
}: IUseResumeMainDataProps) {
  const companyQuery = useCompaniesQuery();
  const projectQuery = useProjectsQuery();
  const mainSkillSelectOptions = useSkillOptionQuery('mainSkill');

  const allProjects = useMemo(() => {
    const projects = projectQuery.data ?? DB_PROJECT_DATAS;
    return [...projects].sort((a, b) => a.name.localeCompare(b.name));
  }, [projectQuery.data]);

  const toyProjectData = useMemo(() => {
    const data = companyQuery.data ?? DB_COMPANY_DATAS;
    return data.filter(company => company.type === 'T');
  }, [companyQuery.data]);

  const companies = useMemo(() => {
    const data = companyQuery.data ?? DB_COMPANY_DATAS;
    return data
      .filter(company => company.type === 'C')
      .map(company => company.name)
      .filter(Boolean);
  }, [companyQuery.data]);

  const skillOptions = useMemo(
    () => mainSkillSelectOptions.data?.map((select: ISelectProperty) => select.name) || DB_SKILL,
    [mainSkillSelectOptions.data],
  );

  const projectTypeOptions = useMemo(() => {
    return [...new Set(allProjects.flatMap(project => getProjectTypeNames(project)))].sort((a, b) =>
      a.localeCompare(b),
    );
  }, [allProjects]);

  const parseCompanyQuery: ICompanyData[] = useMemo(() => {
    const companyData = (companyQuery.data ?? DB_COMPANY_DATAS)
      .filter(company => selectedCompanies?.includes(company.name))
      .sort((a, b) => (a.order > b.order ? ASCENDING_ORDER : DESCENDING_ORDER));

    return /O/.test(sortValue) ? companyData.reverse() : companyData;
  }, [companyQuery.data, sortValue, selectedCompanies]);

  const parseProjectQuery: IProjectData[] = useMemo(() => {
    return allProjects.filter(project => {
      if (selectedProjectIds) {
        if (!selectedProjectIds.includes(project.id)) return false;
      } else if (!project.isVisible) {
        return false;
      }

      const skillInfo = JSON.stringify(project.techStack);
      const matchesSkill = selectedSkillOptions?.some(item => new RegExp(item).test(skillInfo));
      if (!matchesSkill) return false;
      if (!selectedProjectTypes || selectedProjectTypes.length === 0) return false;
      const typeNames = getProjectTypeNames(project);
      if (typeNames.length === 0) return true;
      return typeNames.some(typeName => selectedProjectTypes.includes(typeName));
    });
  }, [allProjects, selectedProjectIds, selectedProjectTypes, selectedSkillOptions]);

  return {
    companyQuery,
    projectQuery,
    mainSkillSelectOptions,
    toyProjectData,
    companies,
    skillOptions,
    projectTypeOptions,
    allProjects,
    parseCompanyQuery,
    parseProjectQuery,
  };
}
