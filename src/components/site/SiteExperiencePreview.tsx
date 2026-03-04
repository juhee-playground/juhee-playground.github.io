import { useMemo } from 'react';

import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import COMPANY_DATA from '@/data/DB_company.json';
import PROJECT_DATA from '@/data/DB_project.json';
import useCompaniesQuery from '@/hooks/queries/useCompaniesQuery';
import useProjectsQuery from '@/hooks/queries/useProjectsQuery';
import CardListItem from '@/components/resume/card/CardListItem';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';
import { getPlainText } from '@/utils/notions';

const DB_COMPANY = COMPANY_DATA as ICompanyProperties[];
const DB_PROJECT = PROJECT_DATA as IProjectProperties[];

const MAX_COMPANIES = 2;
const MAX_PROJECTS_PER_COMPANY = 2;

const SiteExperiencePreview = () => {
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';

  const companyQuery = useCompaniesQuery();
  const projectQuery = useProjectsQuery();

  const companies = useMemo(() => {
    const data = companyQuery.data || DB_COMPANY;
    return data
      .filter(c => getPlainText(c.type, 'rich_text') === 'C')
      .sort((a, b) => (a.order.number > b.order.number ? 1 : -1))
      .slice(0, MAX_COMPANIES);
  }, [companyQuery.data]);

  const slicedProjects = useMemo(() => {
    const all = projectQuery.data || DB_PROJECT;
    return companies.flatMap(company =>
      all
        .filter(p => p.company?.relation?.[0]?.id === company.id)
        .slice(0, MAX_PROJECTS_PER_COMPANY),
    );
  }, [projectQuery.data, companies]);

  const companyNames = useMemo(
    () => companies.map(c => getPlainText(c.name, 'title')),
    [companies],
  );

  return (
    <div className='flex flex-col gap-6'>
      <div
        className={cn(
          'rounded-2xl overflow-hidden border',
          isDark ? 'border-white/10' : 'border-black/8',
        )}
      >
        {companies.map((company, i) => (
          <div
            key={company.id}
            className={cn(
              'px-2 py-1',
              isDark ? 'bg-white/2' : 'bg-white',
              i < companies.length - 1 && (isDark ? 'border-b border-white/10' : 'border-b border-black/8'),
            )}
          >
            <CardListItem
              info={company}
              subInfo={slicedProjects}
              filters={companyNames}
              isLastCompany={i === companies.length - 1}
            />
          </div>
        ))}
      </div>

      <div className='flex justify-end'>
        <Link
          to='/resume'
          className={cn(
            'text-xs font-bold flex items-center gap-1 transition-opacity hover:opacity-70',
          )}
          style={{ color: pointColor.hex }}
        >
          전체 이력서 보기 →
        </Link>
      </div>
    </div>
  );
};

export default SiteExperiencePreview;
