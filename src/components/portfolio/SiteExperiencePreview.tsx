import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';

import COMPANY_DATA from '@/data/DB_company.json';
import useCompaniesQuery from '@/hooks/queries/useCompaniesQuery';
import useProjectsQuery from '@/hooks/queries/useProjectsQuery';
import { useSettings } from '@/stores/useSettings';
import { parseCompanyData } from '@/utils/parser';
import { getGameBoyPalette } from './gameboyPalette';

const DB_COMPANY = (COMPANY_DATA as ICompanyProperties[]).map(c => parseCompanyData(c));

const SiteExperiencePreview = () => {
  const { pointColor, shellStyle } = useSettings();
  const gb = getGameBoyPalette(shellStyle, pointColor.hex);

  const companyQuery = useCompaniesQuery();
  const projectQuery = useProjectsQuery();

  const companies = useMemo(() => {
    const data = companyQuery.data ?? DB_COMPANY;
    return data
      .filter(c => c.type === 'C')
      .sort((a, b) => dayjs(b.startDate).valueOf() - dayjs(a.startDate).valueOf());
  }, [companyQuery.data]);

  const projects = projectQuery.data ?? [];

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
          className='p-5 flex flex-col gap-3'
          style={{
            backgroundColor: gb.panel,
            border: `2px solid ${gb.border}`,
            borderRadius: 4,
            boxShadow: `3px 3px 0 ${gb.border}`,
          }}
        >
          <div className='flex items-center justify-between gap-3'>
            <h3 className='text-xl font-semibold leading-none m-0 flex items-center gap-2' style={{ color: gb.text }}>
              {company.iconEmoji && <span>{company.iconEmoji}</span>}
              {!company.iconEmoji && company.iconUrl && (
                <img src={company.iconUrl} alt='' className='w-6 h-6 rounded-sm object-cover' />
              )}
              <span>{company.name}</span>
            </h3>
            <span className='pixel-font text-[8px]' style={{ color: gb.textDim }}>
              {company.startDate}~{company.endDate ?? 'Now'}
            </span>
          </div>
          <p className='text-sm leading-relaxed m-0' style={{ color: gb.textDim }}>
            <span className='font-semibold' style={{ color: gb.text }}>{company.role}</span>
            <span> | {company.department}</span>
            <span> | 회사규모: </span>
            <span className='font-semibold' style={{ color: gb.text }}>{getScaleLabel(company.scale)}</span>
            <span> | 프로젝트 수: </span>
            <span className='font-semibold' style={{ color: gb.text }}>
              {projectQuery.isLoading ? '-' : getCompanyProjectCount(company.id)}
            </span>
          </p>
          <p className='text-sm leading-relaxed m-0' style={{ color: gb.text }}>
            {company.description.join(' ')}
          </p>
          <p className='text-sm leading-relaxed m-0' style={{ color: gb.text }}>
            <span className='font-semibold'>핵심 성과: </span>
            <span>{getCompanyHighlight(company.id)}</span>
          </p>
        </div>
      ))}

      <div className='flex justify-end'>
        <Link
          to='/resume'
          className='pixel-font text-[8px] flex items-center gap-1 transition-transform hover:translate-x-1'
          style={{ color: gb.accent }}
        >
          전체 이력서 보기 →
        </Link>
      </div>
    </div>
  );
};

export default SiteExperiencePreview;
