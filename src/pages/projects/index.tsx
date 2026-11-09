import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

import useCompaniesQuery from '@/hooks/queries/useCompaniesQuery';
import useProjectsQuery from '@/hooks/queries/useProjectsQuery';
import {
  buildCompanyCounts,
  buildDomainCounts,
  buildKeywordCounts,
} from '@/pages/search/buildTagCounts';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

type TFilterChipItem = {
  readonly name: string;
  readonly count: number;
};

type TFilterChipRowProps = {
  readonly title: string;
  readonly items: readonly TFilterChipItem[];
  readonly selectedNames: readonly string[];
  readonly mutedText: string;
  readonly chipIdle: string;
  readonly activeColor: string;
  readonly maxLines?: number;
  readonly onToggle: (name: string) => void;
};

const toggleSelectedName = (selected: readonly string[], name: string): string[] =>
  selected.includes(name) ? selected.filter(item => item !== name) : [...selected, name];

const matchesAnySelected = (values: readonly string[], selected: readonly string[]): boolean =>
  selected.length === 0 || selected.some(name => values.includes(name));

const sortTagCounts = (counts: Record<string, number>): TFilterChipItem[] =>
  Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

const buildMainSkillCounts = (projects: readonly IProjectData[]): TFilterChipItem[] => {
  const counts = projects.reduce<Record<string, number>>((acc, project) => {
    (project.mainSkills ?? []).forEach((tag: ISelectProperty) => {
      if (!tag.name) return;
      acc[tag.name] = (acc[tag.name] ?? 0) + 1;
    });
    return acc;
  }, {});

  return sortTagCounts(counts);
};

const getMainSkillNames = (project: IProjectData): readonly string[] =>
  (project.mainSkills ?? []).map((tag: ISelectProperty) => tag.name).filter(Boolean);

const VISIBILITY_VISIBLE = 'Visible';
const VISIBILITY_HIDDEN = 'Hidden';
const DEFAULT_VISIBILITIES = [VISIBILITY_VISIBLE] as const;

const getVisibilityLabel = (project: IProjectData): string =>
  project.isVisible ? VISIBILITY_VISIBLE : VISIBILITY_HIDDEN;

const buildVisibilityLabelCounts = (projects: readonly IProjectData[]): TFilterChipItem[] =>
  sortTagCounts(
    projects.reduce<Record<string, number>>((acc, project) => {
      const label = getVisibilityLabel(project);
      acc[label] = (acc[label] ?? 0) + 1;
      return acc;
    }, {}),
  );

const isDefaultVisibilityFilter = (selected: readonly string[]): boolean =>
  selected.length === 1 && selected[0] === VISIBILITY_VISIBLE;

const FilterChipRow = ({
  title,
  items,
  selectedNames,
  mutedText,
  chipIdle,
  activeColor,
  maxLines = 1,
  onToggle,
}: TFilterChipRowProps) => {
  const isMultiLine = maxLines > 1;

  return (
    <div className={cn('flex min-w-0 gap-3', isMultiLine ? 'items-start' : 'items-center')}>
      <span
        className={cn(
          'shrink-0 text-avatar font-bold tracking-wider uppercase w-20',
          isMultiLine && 'pt-1',
          mutedText,
        )}
      >
        {title}
      </span>
      <div
        className={cn(
          'min-w-0 flex-1 gap-1.5',
          isMultiLine
            ? cn('flex flex-wrap overflow-hidden', maxLines === 3 && 'max-h-24')
            : 'flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide',
        )}
      >
        {items.length === 0 && <span className={cn('text-xs', mutedText)}>—</span>}
        {items.map(item => {
          const isActive = selectedNames.includes(item.name);
          return (
            <button
              key={item.name}
              type='button'
              onClick={() => onToggle(item.name)}
              className={cn(
                'shrink-0 rounded-md px-2 py-1 text-xs transition-colors',
                isActive ? 'text-[#111]' : chipIdle,
              )}
              style={isActive ? { backgroundColor: activeColor } : undefined}
            >
              {item.name}
              <span className='ml-1 opacity-60'>{item.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';
  const pt = pointColor.hex;
  const projectQuery = useProjectsQuery();
  const companyQuery = useCompaniesQuery();
  const allProjects = projectQuery.data ?? [];
  const companies = companyQuery.data ?? [];

  const [query, setQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<readonly string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<readonly string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<readonly string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<readonly string[]>([]);
  const [selectedVisibilities, setSelectedVisibilities] =
    useState<readonly string[]>(DEFAULT_VISIBILITIES);

  const companyNameById = useMemo(
    () =>
      companies.reduce<Record<string, string>>((acc, company) => {
        if (company.id && company.name) acc[company.id] = company.name;
        return acc;
      }, {}),
    [companies],
  );

  const keywordCounts = useMemo(() => buildKeywordCounts(allProjects), [allProjects]);
  const domainCounts = useMemo(() => buildDomainCounts(allProjects), [allProjects]);
  const companyCounts = useMemo(
    () => buildCompanyCounts(allProjects, companyNameById),
    [allProjects, companyNameById],
  );
  const mainSkillCounts = useMemo(() => buildMainSkillCounts(allProjects), [allProjects]);
  const visibilityCounts = useMemo(() => buildVisibilityLabelCounts(allProjects), [allProjects]);

  const projects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return allProjects.filter(project => {
      const keywordNames = (project.keywords ?? []).map((tag: ISelectProperty) => tag.name);
      const domainNames = (project.domain ?? []).map((tag: ISelectProperty) => tag.name);
      const companyName = companyNameById[project.companyId] || project.companyId;
      const mainSkillNames = getMainSkillNames(project);
      const visibility = getVisibilityLabel(project);

      const matchesKeyword = matchesAnySelected(keywordNames, selectedKeywords);
      const matchesDomain = matchesAnySelected(domainNames, selectedDomains);
      const matchesCompany = matchesAnySelected(companyName ? [companyName] : [], selectedCompanies);
      const matchesSkill = matchesAnySelected(mainSkillNames, selectedSkills);
      const matchesVisibility = matchesAnySelected([visibility], selectedVisibilities);
      if (!matchesKeyword || !matchesDomain || !matchesCompany || !matchesSkill || !matchesVisibility) {
        return false;
      }
      if (!normalizedQuery) return true;

      const haystack = [
        project.name,
        project.summary,
        companyName,
        ...keywordNames,
        ...domainNames,
        ...mainSkillNames,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [
    allProjects,
    companyNameById,
    query,
    selectedCompanies,
    selectedDomains,
    selectedKeywords,
    selectedSkills,
    selectedVisibilities,
  ]);

  const activeChipCount =
    selectedKeywords.length +
    selectedDomains.length +
    selectedCompanies.length +
    selectedSkills.length +
    (isDefaultVisibilityFilter(selectedVisibilities) ? 0 : selectedVisibilities.length);
  const hasActiveFilters = Boolean(query.trim() || activeChipCount > 0);

  const mutedText = isDark ? 'text-white/50' : 'text-black/50';
  const chipIdle = isDark ? 'bg-white/8 text-white/70 hover:bg-white/14' : 'bg-black/5 text-black/70 hover:bg-black/10';
  const controlClass = cn(
    'h-9 w-full rounded-lg border px-3 text-sm outline-none',
    isDark
      ? 'border-white/15 bg-white/5 text-white placeholder:text-white/35 focus:border-white/35'
      : 'border-black/12 bg-white text-[#181717] placeholder:text-black/35 focus:border-black/30',
  );

  return (
    <div className={cn('min-h-screen w-full', isDark ? 'bg-[#181717] text-white' : 'bg-[#fafafa] text-[#181717]')}>
      <main className='w-full mx-auto px-6 py-3'>
        <header className='mb-8'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-4xl font-black tracking-tight mb-3'
          >
            Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={cn('text-sm', mutedText)}
          >
            지금까지 설계하고 만들어온 프로젝트들입니다.
          </motion.p>
        </header>

        <div className='mb-6 flex flex-col gap-2.5'>
          <div className='flex items-center gap-2'>
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder='검색…'
              className={controlClass}
            />
            <button
              type='button'
              aria-label='필터'
              aria-expanded={isFilterOpen}
              title='필터'
              onClick={() => setIsFilterOpen(open => !open)}
              className={cn(
                'relative shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
                isFilterOpen || activeChipCount > 0 ? 'text-[#111]' : chipIdle,
                isDark ? 'border-white/15' : 'border-black/12',
              )}
              style={isFilterOpen || activeChipCount > 0 ? { backgroundColor: pt } : undefined}
            >
              <FilterListIcon sx={{ fontSize: 18 }} />
              {activeChipCount > 0 && (
                <span
                  className={cn(
                    'absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold',
                    isDark ? 'bg-white text-black' : 'bg-[#181717] text-white',
                  )}
                >
                  {activeChipCount}
                </span>
              )}
            </button>
            {hasActiveFilters && (
              <button
                type='button'
                aria-label='초기화'
                title='초기화'
                onClick={() => {
                  setQuery('');
                  setSelectedKeywords([]);
                  setSelectedDomains([]);
                  setSelectedCompanies([]);
                  setSelectedSkills([]);
                  setSelectedVisibilities(DEFAULT_VISIBILITIES);
                }}
                className={cn(
                  'shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
                  chipIdle,
                  isDark ? 'border-white/15' : 'border-black/12',
                )}
              >
                <RestartAltIcon sx={{ fontSize: 18 }} />
              </button>
            )}
          </div>

          {isFilterOpen && (
            <div className='flex flex-col gap-2.5 pt-1'>
              <FilterChipRow
                title='Visible'
                items={visibilityCounts}
                selectedNames={selectedVisibilities}
                mutedText={mutedText}
                chipIdle={chipIdle}
                activeColor={pt}
                onToggle={name => setSelectedVisibilities(current => toggleSelectedName(current, name))}
              />
              <FilterChipRow
                title='Keyword'
                items={keywordCounts}
                selectedNames={selectedKeywords}
                mutedText={mutedText}
                chipIdle={chipIdle}
                activeColor={pt}
                maxLines={3}
                onToggle={name => setSelectedKeywords(current => toggleSelectedName(current, name))}
              />
              <FilterChipRow
                title='Domain'
                items={domainCounts}
                selectedNames={selectedDomains}
                mutedText={mutedText}
                chipIdle={chipIdle}
                activeColor={pt}
                onToggle={name => setSelectedDomains(current => toggleSelectedName(current, name))}
              />
              <FilterChipRow
                title='Company'
                items={companyCounts}
                selectedNames={selectedCompanies}
                mutedText={mutedText}
                chipIdle={chipIdle}
                activeColor={pt}
                onToggle={name => setSelectedCompanies(current => toggleSelectedName(current, name))}
              />
              <FilterChipRow
                title='Skills'
                items={mainSkillCounts}
                selectedNames={selectedSkills}
                mutedText={mutedText}
                chipIdle={chipIdle}
                activeColor={pt}
                onToggle={name => setSelectedSkills(current => toggleSelectedName(current, name))}
              />
            </div>
          )}
        </div>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 gap-4'
          variants={container}
          initial='hidden'
          animate='show'
        >
          {projects.map(({ id, slug, name, summary, period, techStack, url, isVisible }) => (
            <motion.article
              key={id || slug || name}
              variants={cardVariant}
              className={cn(
                'group flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-300',
                isDark
                  ? 'bg-white/3 border-white/10 hover:border-white/25 hover:bg-white/5'
                  : 'bg-white border-black/7 hover:border-black/20 hover:shadow-lg',
                'hover:-translate-y-1',
              )}
            >
              <div className='flex items-start justify-between gap-3'>
                <div className='flex min-w-0 items-center gap-2'>
                  <h2 className='text-sm font-black tracking-widest leading-tight'>{name}</h2>
                  {!isVisible && (
                    <span className={cn('shrink-0 text-[10px] font-semibold', mutedText)}>hidden</span>
                  )}
                </div>
                <span className={cn('shrink-0 text-[10px] font-semibold', mutedText)}>{period}</span>
              </div>

              <p className={cn('text-sm leading-relaxed flex-1', isDark ? 'text-white/55' : 'text-black/55')}>
                {summary}
              </p>

              <div className='flex flex-wrap gap-1'>
                {techStack.map(tag => (
                  <span
                    key={tag}
                    className={cn(
                      'text-[10px] px-2 py-0.5 rounded-full font-semibold',
                      isDark ? 'bg-white/10 text-white/70' : 'bg-black/6 text-black/60',
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className='flex items-center gap-2 pt-2 border-t flex-wrap'
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
              >
                <Link
                  to={slug ? `/projects/${slug}` : '/projects'}
                  className='text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-85'
                  style={{ backgroundColor: pt }}
                >
                  Details →
                </Link>
                {url && (
                  <a
                    href={url}
                    target='_blank'
                    rel='noreferrer'
                    className={cn(
                      'text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all',
                      isDark
                        ? 'border-white/20 hover:border-white/40 text-white/70'
                        : 'border-black/15 hover:border-black/30 text-black/60',
                    )}
                  >
                    Open ↗
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
        {!projectQuery.isLoading && projects.length === 0 && (
          <p className={cn('mt-6 text-sm', mutedText)}>
            {hasActiveFilters ? '조건에 맞는 프로젝트가 없습니다.' : '프로젝트 데이터가 없습니다.'}
          </p>
        )}
      </main>

      <footer
        className={cn(
          'text-center py-8 text-xs border-t',
          isDark ? 'border-white/10 text-white/30' : 'border-black/10 text-black/30',
        )}
      >
        © 2025 BAEK JU HEE
      </footer>
    </div>
  );
};

export default ProjectsPage;
