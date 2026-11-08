import { DragEvent, useEffect, useMemo, useRef, useState } from 'react';

import { useTheme } from '@mui/material/styles';

import COMPANY_DATA from '@/data/DB_company.json';
import PROJECT_DATA from '@/data/DB_project.json';
import useCompaniesQuery from '@/hooks/queries/useCompaniesQuery';
import useProjectsQuery from '@/hooks/queries/useProjectsQuery';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';
import { parseCompanyData, parseProjectData } from '@/utils/parser';

import { buildFilteredCsv } from './buildFilteredCsv';
import {
  buildCompanyCounts,
  buildDomainCounts,
  buildFeaturedCounts,
  buildKeywordCounts,
  buildProjectTypeCounts,
  buildTechCounts,
  buildVisibilityCounts,
  getProjectTechNames,
} from './buildTagCounts';
import { DEFAULT_VISIBLE_COLUMN_IDS, SEARCH_COLUMNS, TSearchColumnId } from './columns';
import { FilterChipPanel } from './FilterChipPanel';
import { getCellTags, getCellText } from './getCellValue';
import { reorderColumns } from './reorderColumns';
import { useTableDragScroll } from './useTableDragScroll';

const FALLBACK_PROJECTS = (PROJECT_DATA as IProjectProperties[]).map(project => parseProjectData(project));
const COPY_STATUS_RESET_MS = 1800;
const FALLBACK_COMPANIES = (COMPANY_DATA as ICompanyProperties[]).map(company => parseCompanyData(company));
const INITIAL_COLUMN_ORDER = SEARCH_COLUMNS.map(column => column.id);
const COLUMN_BY_ID = Object.fromEntries(SEARCH_COLUMNS.map(column => [column.id, column])) as Record<
  TSearchColumnId,
  (typeof SEARCH_COLUMNS)[number]
>;

const isSelectTag = (tag: ISelectProperty | string): tag is ISelectProperty => typeof tag !== 'string';

const SearchPage = () => {
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';
  const projectQuery = useProjectsQuery();
  const companyQuery = useCompaniesQuery();
  const projects = projectQuery.data ?? FALLBACK_PROJECTS;
  const companies = companyQuery.data ?? FALLBACK_COMPANIES;
  const tableRef = useTableDragScroll();
  const dragColumnIdRef = useRef<TSearchColumnId | null>(null);
  const didDragRef = useRef(false);

  const [query, setQuery] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedVisibility, setSelectedVisibility] = useState<string | null>(null);
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);
  const [selectedFeatured, setSelectedFeatured] = useState<string | null>(null);
  const [columnOrder, setColumnOrder] = useState<readonly TSearchColumnId[]>(INITIAL_COLUMN_ORDER);
  const [visibleColumnIds, setVisibleColumnIds] = useState<readonly TSearchColumnId[]>(DEFAULT_VISIBLE_COLUMN_IDS);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copyResetTimerRef = useRef<number | null>(null);

  const companyNameById = useMemo(
    () =>
      companies.reduce<Record<string, string>>((acc, company) => {
        if (company.id && company.name) acc[company.id] = company.name;
        return acc;
      }, {}),
    [companies],
  );

  const orderedColumns = columnOrder.map(id => COLUMN_BY_ID[id]).filter(Boolean);
  const visibleColumns = columnOrder
    .filter(id => visibleColumnIds.includes(id))
    .map(id => COLUMN_BY_ID[id])
    .filter(Boolean);
  const keywordCounts = useMemo(() => buildKeywordCounts(projects), [projects]);
  const domainCounts = useMemo(() => buildDomainCounts(projects), [projects]);
  const companyCounts = useMemo(() => buildCompanyCounts(projects, companyNameById), [projects, companyNameById]);
  const techCounts = useMemo(() => buildTechCounts(projects), [projects]);
  const visibilityCounts = useMemo(() => buildVisibilityCounts(projects), [projects]);
  const projectTypeCounts = useMemo(() => buildProjectTypeCounts(projects), [projects]);
  const featuredCounts = useMemo(() => buildFeaturedCounts(projects), [projects]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter(project => {
      const keywordNames = (project.keywords ?? []).map((tag: ISelectProperty) => tag.name);
      const domainNames = (project.domain ?? []).map((tag: ISelectProperty) => tag.name);
      const companyName = companyNameById[project.companyId] || project.companyId;
      const techNames = getProjectTechNames(project);
      const visibility = project.isVisible ? 'true' : 'false';
      const featured = project.isFeatured ? 'true' : 'false';
      const matchesKeyword = selectedKeyword ? keywordNames.includes(selectedKeyword) : true;
      const matchesDomain = selectedDomain ? domainNames.includes(selectedDomain) : true;
      const matchesCompany = selectedCompany ? companyName === selectedCompany : true;
      const matchesTech = selectedTech ? techNames.includes(selectedTech) : true;
      const matchesVisibility = selectedVisibility ? visibility === selectedVisibility : true;
      const projectTypeNames = (project.projectType ?? []).map((tag: ISelectProperty) => tag.name);
      const matchesProjectType = selectedProjectType ? projectTypeNames.includes(selectedProjectType) : true;
      const matchesFeatured = selectedFeatured ? featured === selectedFeatured : true;
      if (
        !matchesKeyword ||
        !matchesDomain ||
        !matchesCompany ||
        !matchesTech ||
        !matchesVisibility ||
        !matchesProjectType ||
        !matchesFeatured
      ) {
        return false;
      }
      if (!normalizedQuery) return true;

      const haystack = [
        ...SEARCH_COLUMNS.map(column => getCellText(project, column.id)),
        companyName,
        ...techNames,
        visibility,
        featured,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [
    companyNameById,
    projects,
    query,
    selectedCompany,
    selectedDomain,
    selectedFeatured,
    selectedKeyword,
    selectedProjectType,
    selectedTech,
    selectedVisibility,
  ]);

  const hasActiveFilters = Boolean(
    selectedKeyword ||
      selectedDomain ||
      selectedCompany ||
      selectedTech ||
      selectedVisibility ||
      selectedProjectType ||
      selectedFeatured ||
      query,
  );

  useEffect(
    () => () => {
      if (copyResetTimerRef.current) window.clearTimeout(copyResetTimerRef.current);
    },
    [],
  );

  const toggleColumn = (columnId: TSearchColumnId) => {
    if (columnId === 'name') return;
    setVisibleColumnIds(current =>
      current.includes(columnId) ? current.filter(id => id !== columnId) : [...current, columnId],
    );
  };

  const handleColumnDragStart = (columnId: TSearchColumnId) => (event: DragEvent<HTMLButtonElement>) => {
    if (columnId === 'name') {
      event.preventDefault();
      return;
    }
    didDragRef.current = false;
    dragColumnIdRef.current = columnId;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', columnId);
  };

  const handleColumnDragOver = (columnId: TSearchColumnId) => (event: DragEvent<HTMLButtonElement>) => {
    if (columnId === 'name' || !dragColumnIdRef.current || dragColumnIdRef.current === columnId) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleColumnDrop = (columnId: TSearchColumnId) => (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const fromId = dragColumnIdRef.current;
    if (!fromId || fromId === columnId || columnId === 'name') return;
    didDragRef.current = true;
    setColumnOrder(current => reorderColumns(current, fromId, columnId));
    dragColumnIdRef.current = null;
  };

  const handleColumnDragEnd = () => {
    dragColumnIdRef.current = null;
  };

  const handleColumnClick = (columnId: TSearchColumnId) => {
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    toggleColumn(columnId);
  };

  const handleCopyCsv = async () => {
    const csv = buildFilteredCsv(filteredProjects, visibleColumns, companyNameById);
    if (copyResetTimerRef.current) {
      window.clearTimeout(copyResetTimerRef.current);
    }

    try {
      await navigator.clipboard.writeText(csv);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }

    copyResetTimerRef.current = window.setTimeout(() => setCopyStatus('idle'), COPY_STATUS_RESET_MS);
  };

  const panelClass = isDark ? 'bg-white/4 border-white/10' : 'bg-white border-black/8';
  const mutedText = isDark ? 'text-white/50' : 'text-black/50';
  const chipIdle = isDark ? 'bg-white/8 text-white/70 hover:bg-white/14' : 'bg-black/5 text-black/70 hover:bg-black/10';
  const copyLabel =
    copyStatus === 'copied' ? '복사됨' : copyStatus === 'failed' ? '복사 실패' : 'CSV 복사';

  return (
    <div className={cn('w-full min-h-screen px-4 py-8 md:px-6', isDark ? 'text-white' : 'text-[#181717]')}>
      <header className='mb-4'>
        <h1 className='text-2xl font-black tracking-tight'>Project Search</h1>
        <p className={cn('mt-1 text-sm', mutedText)}>
          keywords / domain / properties 한눈에 보기 · 저장 없음 · 드래그로 스크롤
        </p>
      </header>

      <div className='mb-3 grid gap-4 md:grid-cols-2'>
        <FilterChipPanel
          title='Keywords'
          items={keywordCounts}
          selectedName={selectedKeyword}
          emptyText='키워드 없음'
          panelClass={panelClass}
          mutedText={mutedText}
          chipIdle={chipIdle}
          activeColor={pointColor.hex}
          onSelect={setSelectedKeyword}
        />
        <FilterChipPanel
          title='Domain'
          items={domainCounts}
          selectedName={selectedDomain}
          emptyText='아직 비어 있음 · Notion/데이터에 domain 채우면 여기 뜸'
          panelClass={panelClass}
          mutedText={mutedText}
          chipIdle={chipIdle}
          activeColor={pointColor.hex}
          onSelect={setSelectedDomain}
        />
        <FilterChipPanel
          title='Company'
          items={companyCounts}
          selectedName={selectedCompany}
          emptyText='회사 없음'
          panelClass={panelClass}
          mutedText={mutedText}
          chipIdle={chipIdle}
          activeColor={pointColor.hex}
          onSelect={setSelectedCompany}
        />
        <FilterChipPanel
          title='Tech'
          items={techCounts}
          selectedName={selectedTech}
          emptyText='기술 없음'
          panelClass={panelClass}
          mutedText={mutedText}
          chipIdle={chipIdle}
          activeColor={pointColor.hex}
          onSelect={setSelectedTech}
        />
        <FilterChipPanel
          title='isVisible'
          items={visibilityCounts}
          selectedName={selectedVisibility}
          emptyText='값 없음'
          panelClass={panelClass}
          mutedText={mutedText}
          chipIdle={chipIdle}
          activeColor={pointColor.hex}
          onSelect={setSelectedVisibility}
        />
        <FilterChipPanel
          title='projectType'
          items={projectTypeCounts}
          selectedName={selectedProjectType}
          emptyText='아직 비어 있음 · Notion/데이터에 projectType 채우면 여기 뜸'
          panelClass={panelClass}
          mutedText={mutedText}
          chipIdle={chipIdle}
          activeColor={pointColor.hex}
          onSelect={setSelectedProjectType}
        />
        <FilterChipPanel
          title='isFeatured'
          items={featuredCounts}
          selectedName={selectedFeatured}
          emptyText='값 없음'
          panelClass={panelClass}
          mutedText={mutedText}
          chipIdle={chipIdle}
          activeColor={pointColor.hex}
          onSelect={setSelectedFeatured}
        />
      </div>

      <section className={cn('mb-3 rounded-xl border p-4', panelClass)}>
        <div className='mb-2 flex items-center justify-between gap-2'>
          <h2 className='text-xs font-bold tracking-wider uppercase'>Columns</h2>
          <span className={cn('text-[11px]', mutedText)}>name 고정 · 드래그로 순서 · 클릭으로 숨김/표시</span>
        </div>
        <div className='flex flex-wrap gap-2'>
          {orderedColumns.map(column => {
            const isVisible = visibleColumnIds.includes(column.id);
            const isLocked = column.id === 'name';
            return (
              <button
                key={column.id}
                type='button'
                draggable={!isLocked}
                disabled={isLocked}
                onDragStart={handleColumnDragStart(column.id)}
                onDragOver={handleColumnDragOver(column.id)}
                onDrop={handleColumnDrop(column.id)}
                onDragEnd={handleColumnDragEnd}
                onClick={() => handleColumnClick(column.id)}
                className={cn(
                  'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                  isVisible ? 'text-[#111]' : chipIdle,
                  isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-grab active:cursor-grabbing',
                )}
                style={isVisible ? { backgroundColor: pointColor.hex } : undefined}
              >
                {column.label}
              </button>
            );
          })}
        </div>
      </section>

      <div className='mb-2 flex flex-wrap items-center gap-3'>
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder='텍스트 검색…'
          className={cn(
            'h-10 w-full max-w-md rounded-lg border px-3 text-sm outline-none',
            isDark
              ? 'border-white/15 bg-white/5 placeholder:text-white/35 focus:border-white/35'
              : 'border-black/12 bg-white placeholder:text-black/35 focus:border-black/30',
          )}
        />
        <span className={cn('text-xs', mutedText)}>
          {filteredProjects.length} / {projects.length} projects
        </span>
        <button
          type='button'
          onClick={handleCopyCsv}
          disabled={filteredProjects.length === 0 || visibleColumns.length === 0}
          className={cn(
            'rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed',
            copyStatus === 'copied' ? 'text-[#111]' : chipIdle,
          )}
          style={copyStatus === 'copied' ? { backgroundColor: pointColor.hex } : undefined}
        >
          {copyLabel}
        </button>
        {hasActiveFilters && (
          <button
            type='button'
            onClick={() => {
              setQuery('');
              setSelectedKeyword(null);
              setSelectedDomain(null);
              setSelectedCompany(null);
              setSelectedTech(null);
              setSelectedVisibility(null);
              setSelectedProjectType(null);
              setSelectedFeatured(null);
            }}
            className={cn('rounded-md px-2.5 py-1.5 text-xs font-medium', chipIdle)}
          >
            필터 초기화
          </button>
        )}
      </div>

      <section className={cn('mb-4 rounded-xl border overflow-hidden', panelClass)}>
        <div
          ref={tableRef}
          className='max-h-[70vh] overflow-auto overscroll-contain'
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <table className='min-w-max border-separate border-spacing-0 text-left text-xs'>
            <thead className='sticky top-0 z-20'>
              <tr>
                {visibleColumns.map(column => (
                  <th
                    key={column.id}
                    className={cn(
                      'border-b px-3 py-2.5 font-bold tracking-wide whitespace-nowrap',
                      isDark ? 'border-white/10 bg-[#1d1d1d]' : 'border-black/10 bg-[#f6f6f6]',
                      column.sticky && 'sticky left-0 z-30',
                    )}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(project => (
                <tr key={project.id || project.name} className={isDark ? 'hover:bg-white/4' : 'hover:bg-black/[0.03]'}>
                  {visibleColumns.map(column => {
                    const text =
                      column.id === 'companyId'
                        ? companyNameById[project.companyId] || getCellText(project, column.id)
                        : getCellText(project, column.id);
                    const tags = getCellTags(project, column.id);

                    return (
                      <td
                        key={column.id}
                        className={cn(
                          'align-top border-b px-3 py-2.5',
                          isDark ? 'border-white/8' : 'border-black/6',
                          column.sticky && cn('sticky left-0 z-10', isDark ? 'bg-[#1a1a1a]' : 'bg-white'),
                          column.kind === 'text' && 'max-w-[320px]',
                        )}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.kind === 'tags' ? (
                          <div className='flex flex-wrap gap-1'>
                            {tags.length === 0 && <span className={mutedText}>—</span>}
                            {tags.map(tag => {
                              const label = isSelectTag(tag) ? tag.name : tag;
                              const key = isSelectTag(tag) ? tag.id || tag.name : tag;
                              return (
                                <span
                                  key={key}
                                  className={cn(
                                    'inline-flex rounded px-1.5 py-0.5 text-[10px] font-medium',
                                    isDark ? 'bg-white/10 text-white/80' : 'bg-black/6 text-black/75',
                                  )}
                                >
                                  {label}
                                </span>
                              );
                            })}
                          </div>
                        ) : column.kind === 'link' && text ? (
                          <a
                            href={text.startsWith('http') ? text : undefined}
                            target='_blank'
                            rel='noreferrer'
                            className='underline underline-offset-2 break-all'
                            style={{ color: pointColor.hex }}
                          >
                            {text}
                          </a>
                        ) : (
                          <p className='whitespace-pre-wrap break-words leading-relaxed'>{text || '—'}</p>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProjects.length === 0 && (
            <p className={cn('p-8 text-sm text-center', mutedText)}>조건에 맞는 프로젝트가 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
