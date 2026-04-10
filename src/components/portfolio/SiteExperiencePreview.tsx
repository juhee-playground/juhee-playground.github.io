import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';

import COMPANY_DATA from '@/data/DB_company.json';
import PROJECT_DATA from '@/data/DB_project.json';
import useCompaniesQuery from '@/hooks/queries/useCompaniesQuery';
import useProjectsQuery from '@/hooks/queries/useProjectsQuery';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';
import { parseCompanyData, parseProjectData } from '@/utils/parser';

const DB_COMPANY = (COMPANY_DATA as ICompanyProperties[]).map(c => parseCompanyData(c));
const DB_PROJECT = (PROJECT_DATA as IProjectProperties[]).map(p => parseProjectData(p));

const SiteExperiencePreview = () => {
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';

  const companyQuery = useCompaniesQuery();
  const projectQuery = useProjectsQuery();

  const companies = useMemo(() => {
    const data = companyQuery.data ?? DB_COMPANY;
    return data
      .filter(c => c.type === 'C')
      .sort((a, b) => dayjs(b.startDate).valueOf() - dayjs(a.startDate).valueOf());
  }, [companyQuery.data]);

  const projects = projectQuery.data ?? DB_PROJECT;

  const getScaleLabel = (scale: string) => {
    if (!scale?.trim()) return '-';
    return scale.includes('+') ? scale : `${scale}+`;
  };

  const getCompanyProjectCount = (companyId: string) =>
    projects.filter(project => project.companyId === companyId).length;

  const getCompanyHighlight = (companyId: string) => {
    const companyProjects = projects.filter(project => project.companyId === companyId);
    const candidate =
      companyProjects
        .map(project => (project.impact || project.summary || '').trim())
        .find(Boolean) ?? '';

    if (!candidate) return '핵심 성과 데이터 업데이트 예정';
    return candidate.split('\n')[0];
  };

  return (
    <div className='flex flex-col gap-6'>
      {companies.map(company => (
        <div
          key={company.id}
          className={cn(
            'rounded-2xl border p-5 flex flex-col gap-3',
            isDark ? 'bg-white/3 border-white/10' : 'bg-white border-black/8',
          )}
        >
          <div className='flex items-center justify-between gap-3'>
            <h3 className='text-2xl font-semibold leading-none m-0 flex items-center gap-2'>
              {company.iconEmoji && <span>{company.iconEmoji}</span>}
              {!company.iconEmoji && company.iconUrl && (
                <img src={company.iconUrl} alt='' className='w-6 h-6 rounded-sm object-cover' />
              )}
              <span>{company.name}</span>
            </h3>
            <span className={cn('text-sm font-semibold', isDark ? 'text-white/55' : 'text-black/50')}>
              {company.startDate}~{company.endDate ?? 'Now'}
            </span>
          </div>
          <p className='text-sm leading-relaxed m-0'>
            <span className='font-semibold'>{company.role}</span>
            <span> | {company.department}</span>
            <span> | 회사규모: </span>
            <span className='font-semibold'>{getScaleLabel(company.scale)}</span>
            <span> | 프로젝트 수: </span>
            <span className='font-semibold'>{getCompanyProjectCount(company.id)}</span>
          </p>
          <p className={cn('text-sm leading-relaxed m-0', isDark ? 'text-white/70' : 'text-black/70')}>
            {company.description.join(' ')}
          </p>
          <p className={cn('text-sm leading-relaxed m-0', isDark ? 'text-white/70' : 'text-black/70')}>
            <span className='font-semibold'>핵심 성과: </span>
            <span>{getCompanyHighlight(company.id)}</span>
          </p>
        </div>
      ))}

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
