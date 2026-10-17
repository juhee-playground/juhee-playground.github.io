import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';

import COMPANY_DATA from '@/data/DB_company.json';
import useCompaniesQuery from '@/hooks/queries/useCompaniesQuery';
import useProjectsQuery from '@/hooks/queries/useProjectsQuery';
import { useSettings } from '@/stores/useSettings';
import { parseCompanyData } from '@/utils/parser';

import { CompanyCartridge, getCompanyCartTheme } from './CompanyCartridge';
import { getGameBoyPalette } from './gameboyPalette';

const DB_COMPANY = (COMPANY_DATA as ICompanyProperties[]).map(c => parseCompanyData(c));

const formatCartPeriod = (start: string, end: string | null) => {
  const startLabel = start ? dayjs(start).format('YYYY.MM') : '????.??';
  const endLabel = end ? dayjs(end).format('YYYY.MM') : 'PRESENT';
  return `${startLabel} - ${endLabel}`;
};

const ROLE_EN: Record<string, string> = {
  '프런트 개발자': 'Frontend Developer',
  '프론트 개발자': 'Frontend Developer',
  '프론트엔드 개발자': 'Frontend Developer',
  '웹 개발자': 'Web Developer',
  개발자: 'Developer',
};

const toRoleEn = (role: string) => ROLE_EN[role] ?? (role.trim() ? role : 'Frontend Developer');

const YU_COMPANY_NAMES = new Set(['와이유파트너스', 'YU파트너스']);

const getCartLogo = (company: { name: string; iconUrl?: string; iconEmoji?: string }) => {
  if (YU_COMPANY_NAMES.has(company.name)) {
    return { logoLabel: 'YU' as const };
  }
  return {
    logoSrc: company.iconUrl,
    logoEmoji: company.iconEmoji,
  };
};

const SiteExperiencePreview = () => {
  const { pointColor, shellStyle } = useSettings();
  const gb = getGameBoyPalette(shellStyle, pointColor.hex);
  const isDarkShell = shellStyle === 'pocket';
  const detailTitleClass = isDarkShell ? 'text-white' : '';
  const detailDateClass = isDarkShell ? 'text-slate-300' : '';
  const detailBodyClass = isDarkShell ? 'text-slate-200' : '';

  const companyQuery = useCompaniesQuery();
  const projectQuery = useProjectsQuery();

  const companies = useMemo(() => {
    const data = companyQuery.data ?? DB_COMPANY;
    return data
      .filter(c => c.type === 'C')
      .sort((a, b) => dayjs(b.startDate).valueOf() - dayjs(a.startDate).valueOf());
  }, [companyQuery.data]);

  const [selectedCompanyId, setSelectedCompanyId] = useState('');

  useEffect(() => {
    if (!companies.length) return;
    const hasSelected = companies.some(company => company.id === selectedCompanyId);
    if (!hasSelected) setSelectedCompanyId(companies[0].id);
  }, [companies, selectedCompanyId]);

  const projects = projectQuery.data ?? [];
  const selectedCompany = companies.find(company => company.id === selectedCompanyId) ?? companies[0];

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
    <div className='flex flex-col gap-5'>
      <div className='grid grid-cols-1 justify-items-center gap-7 sm:grid-cols-2 lg:grid-cols-3'>
        {companies.map((company, index) => (
          <CompanyCartridge
            key={company.id}
            company={{
              id: company.id,
              name: company.name,
              period: formatCartPeriod(company.startDate, company.endDate),
              orderLabel: String(index + 1).padStart(2, '0'),
              ...getCartLogo(company),
              description: toRoleEn(company.role),
              theme: getCompanyCartTheme(company.name),
              isActive: company.id === selectedCompanyId,
              onClick: () => setSelectedCompanyId(company.id),
            }}
          />
        ))}
      </div>

      {selectedCompany && (
        <div
          className='flex flex-col gap-3 rounded p-5'
          style={{
            backgroundColor: gb.panel,
            border: `2px solid ${gb.border}`,
            boxShadow: `3px 3px 0 ${gb.border}`,
          }}
        >
          <div className='flex items-start justify-between gap-3'>
            <h3
              className={`m-0 flex items-center gap-2 text-2xl font-bold leading-tight ${detailTitleClass}`}
              style={isDarkShell ? undefined : { color: gb.text }}
            >
              {selectedCompany.iconEmoji && <span>{selectedCompany.iconEmoji}</span>}
              {!selectedCompany.iconEmoji && selectedCompany.iconUrl && (
                <img src={selectedCompany.iconUrl} alt='' className='h-7 w-7 rounded-sm object-cover' />
              )}
              <span>{selectedCompany.name}</span>
            </h3>
            <span
              className={`shrink-0 text-sm font-medium tabular-nums ${detailDateClass}`}
              style={isDarkShell ? undefined : { color: gb.textDim }}
            >
              {selectedCompany.startDate}~{selectedCompany.endDate ?? 'Now'}
            </span>
          </div>
          <p
            className={`m-0 text-base leading-7 ${detailBodyClass}`}
            style={isDarkShell ? undefined : { color: gb.textDim }}
          >
            <span className='font-semibold' style={{ color: gb.text }}>
              {selectedCompany.role}
            </span>
            <span> | {selectedCompany.department}</span>
            <span> | 회사규모: </span>
            <span className='font-semibold' style={{ color: gb.text }}>
              {getScaleLabel(selectedCompany.scale)}
            </span>
            <span> | 프로젝트 수: </span>
            <span className='font-semibold' style={{ color: gb.text }}>
              {projectQuery.isLoading ? '-' : getCompanyProjectCount(selectedCompany.id)}
            </span>
          </p>
          <p
            className={`m-0 text-base leading-7 ${detailBodyClass}`}
            style={isDarkShell ? undefined : { color: gb.text }}
          >
            {selectedCompany.description.join(' ')}
          </p>
          <p
            className={`m-0 text-base leading-7 ${detailBodyClass}`}
            style={isDarkShell ? undefined : { color: gb.text }}
          >
            <span className='font-semibold' style={{ color: gb.text }}>
              핵심 성과:{' '}
            </span>
            <span>{getCompanyHighlight(selectedCompany.id)}</span>
          </p>
        </div>
      )}

      <div className='flex justify-end'>
        <Link
          to='/resume'
          className='pixel-font flex items-center gap-1 text-body-2xs transition-transform hover:translate-x-1'
          style={{ color: gb.accentText }}
        >
          전체 이력서 보기 →
        </Link>
      </div>
    </div>
  );
};

export default SiteExperiencePreview;
