import { useMemo } from 'react';

import COMPANY_DATA from '@/data/DB_company.json';
import PROJECT_DATA from '@/data/DB_project.json';
import DB_SKILL from '@/data/DB_skill.json';

import useCompaniesQuery from '@/hooks/queries/useCompaniesQuery';
import useProjectsQuery from '@/hooks/queries/useProjectsQuery';
import useSkillOptionQuery from '@/hooks/queries/useSkillOptionsQuery';

import { getPlainText } from '@/utils/notions';

const DB_COMPANY_DATAS = COMPANY_DATA as ICompanyProperties[];
const DB_PROJECT_DATAS = PROJECT_DATA as IProjectProperties[];

const ASCENDING_ORDER = 1;
const DESCENDING_ORDER = -1;

interface IUseResumeMainDataProps {
  selectedCompanies: string[] | undefined;
  selectedSkillOptions: string[] | undefined;
  sortValue: string;
}

export default function useResumeMainData({
  selectedCompanies,
  selectedSkillOptions,
  sortValue,
}: IUseResumeMainDataProps) {
  const companyQuery = useCompaniesQuery();
  const projectQuery = useProjectsQuery();
  const mainSkillSelectOptions = useSkillOptionQuery('mainSkill');

  const toyProjectData = useMemo(() => {
    const data = companyQuery.data || DB_COMPANY_DATAS;
    return data.filter(company => getPlainText(company.type, 'rich_text') === 'T');
  }, [companyQuery.data]);

  const companies = useMemo(() => {
    const data = companyQuery.data || DB_COMPANY_DATAS;
    return data
      .filter(company => getPlainText(company.type, 'rich_text') === 'C')
      .map(company => getPlainText(company.name, 'title'))
      .filter(Boolean);
  }, [companyQuery.data]);

  const skillOptions = useMemo(
    () => mainSkillSelectOptions.data?.map((select: ISelectProperty) => select.name) || DB_SKILL,
    [mainSkillSelectOptions.data],
  );

  const parseCompanyQuery: ICompanyProperties[] = useMemo(() => {
    const companyData = (companyQuery.data || DB_COMPANY_DATAS)
      .filter(company => selectedCompanies?.includes(getPlainText(company.name, 'title')))
      .sort((a, b) => (a.order.number > b.order.number ? ASCENDING_ORDER : DESCENDING_ORDER));

    return /O/.test(sortValue) ? companyData.reverse() : companyData;
  }, [companyQuery.data, sortValue, selectedCompanies]);

  const parseProjectQuery: IProjectProperties[] = useMemo(() => {
    return (projectQuery.data || DB_PROJECT_DATAS).filter(project => {
      const skillInfo = JSON.stringify(project.mainSkill.multi_select);
      return selectedSkillOptions?.some(item => new RegExp(item).test(skillInfo));
    });
  }, [projectQuery.data, selectedSkillOptions]);

  return {
    companyQuery,
    projectQuery,
    mainSkillSelectOptions,
    toyProjectData,
    companies,
    skillOptions,
    parseCompanyQuery,
    parseProjectQuery,
  };
}
