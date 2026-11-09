import { Link, useParams } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import { ArchitectureSection } from '@/components/projects/ArchitectureSection';
import useCompaniesQuery from '@/hooks/queries/useCompaniesQuery';
import useProjectsQuery from '@/hooks/queries/useProjectsQuery';
import { cn } from '@/utils/classNames';

const splitContentLines = (content: string): readonly string[] =>
  content
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean);

const isBulletLine = (line: string) => /^[-•*]\s+/.test(line) || /^\d+[.)]\s+/.test(line);

const stripBullet = (line: string) => line.replace(/^[-•*]\s+/, '').replace(/^\d+[.)]\s+/, '');

const toContentItems = (content: string): readonly string[] => {
  const lines = splitContentLines(content);
  if (lines.length === 0) return [];
  if (lines.some(isBulletLine)) return lines.map(stripBullet);
  if (lines.length === 1) return lines;
  return lines;
};

/** keyContributions: 줄바꿈 + '-' 항목 기준 파싱. 번호 목록도 허용. */
const parseKeyContributionItems = (content: string): readonly string[] => {
  const lines = content
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return [];

  const dashLines = lines.filter(line => /^[-•*]\s+/.test(line));
  if (dashLines.length > 0) {
    return dashLines.map(line => line.replace(/^[-•*]\s+/, '').trim()).filter(Boolean);
  }

  const numberedLines = lines.filter(line => /^\d+[.)]\s+/.test(line));
  if (numberedLines.length > 0) {
    return numberedLines.map(line => line.replace(/^\d+[.)]\s+/, '').trim()).filter(Boolean);
  }

  return lines;
};

interface IChipProps {
  readonly label: string;
  readonly isDark: boolean;
}

const MetaChip = ({ label, isDark }: IChipProps) => (
  <span
    className={cn(
      'rounded-sm px-2.5 py-1 text-xs font-medium',
      isDark ? 'bg-white/10 text-white/75' : 'bg-black/[0.06] text-black/65',
    )}
  >
    {label}
  </span>
);

interface ISectionHeadingProps {
  readonly children: string;
  readonly isDark: boolean;
}

const SectionHeading = ({ children, isDark }: ISectionHeadingProps) => (
  <h2
    className={cn(
      'm-0 text-xl font-bold tracking-tight md:text-2xl',
      isDark ? 'text-white' : 'text-[#181717]',
    )}
  >
    {children}
  </h2>
);

interface IBodyTextProps {
  readonly children: string;
  readonly isDark: boolean;
  readonly className?: string;
}

const BodyText = ({ children, isDark, className }: IBodyTextProps) => (
  <p
    className={cn(
      'm-0 whitespace-pre-line text-[15px] leading-[1.75] md:text-base md:leading-[1.8]',
      isDark ? 'text-white/75' : 'text-black/70',
      className,
    )}
  >
    {children}
  </p>
);

interface IItemListProps {
  readonly items: readonly string[];
  readonly isDark: boolean;
  readonly ordered?: boolean;
}

const ItemList = ({ items, isDark, ordered = false }: IItemListProps) => {
  if (items.length === 0) return null;

  const ListTag = ordered ? 'ol' : 'ul';
  const listClass = ordered ? 'list-decimal' : 'list-disc';

  return (
    <ListTag
      className={cn(
        'm-0 flex flex-col gap-3.5 pl-5 md:gap-4',
        listClass,
        isDark ? 'text-white/70 marker:text-white/35' : 'text-black/70 marker:text-black/30',
      )}
    >
      {items.map((item, index) => (
        <li
          key={`${item}_${index}`}
          className={cn(
            'pl-1 text-[15px] leading-[1.8] md:text-base md:leading-[1.85]',
            isDark ? 'text-white/80' : 'text-black/75',
          )}
        >
          {item}
        </li>
      ))}
    </ListTag>
  );
};

const getProjectNavMeta = (
  target: IProjectData,
  companies: readonly ICompanyData[] | undefined,
): string | null => {
  const company = companies?.find(item => item.id === target.companyId);
  const isSideProject = !company || company.type === 'T';

  if (isSideProject) return 'Side Project';

  const companyName = company.name?.trim();
  if (!companyName) return null;

  const projectTypeLabel =
    (target.projectType ?? [])
      .map(tag => tag.name.trim())
      .find(Boolean) ?? 'Company Project';

  return `${companyName} · ${projectTypeLabel}`;
};

interface INavProjectLinkProps {
  readonly label: string;
  readonly project: IProjectData;
  readonly meta: string | null;
  readonly isDark: boolean;
  readonly align?: 'start' | 'end';
}

const NavProjectLink = ({
  label,
  project,
  meta,
  isDark,
  align = 'start',
}: INavProjectLinkProps) => (
  <Link
    to={`/projects/${project.slug}`}
    className={cn(
      'group flex min-w-0 flex-col gap-0.5 no-underline transition-colors',
      align === 'end' && 'sm:items-end',
      isDark ? 'text-white/55 hover:text-white/85' : 'text-black/50 hover:text-black/80',
    )}
  >
    <span className='text-xs font-medium tracking-wide'>{label}</span>
    <span className='truncate text-sm font-semibold'>{project.name}</span>
    {meta && (
      <span
        className={cn(
          'max-w-full truncate text-[11px] font-medium leading-snug',
          isDark ? 'text-white/35' : 'text-black/35',
        )}
      >
        {meta}
      </span>
    )}
  </Link>
);

interface IContributionCardsProps {
  readonly items: readonly string[];
  readonly isDark: boolean;
}

const ContributionCards = ({ items, isDark }: IContributionCardsProps) => {
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        'grid grid-cols-1 items-stretch gap-3 md:gap-4',
        items.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1',
      )}
    >
      {items.map((item, index) => (
        <article
          key={`contribution_${index}`}
          className={cn(
            'flex h-full flex-col items-start gap-2.5 rounded-lg border px-4 py-4 transition-colors duration-200 md:px-5 md:py-5',
            isDark
              ? 'border-white/12 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
              : 'border-black/10 bg-black/[0.02] hover:border-black/16 hover:bg-black/[0.035]',
          )}
        >
          <span
            className={cn(
              'text-[10px] font-medium tabular-nums tracking-[0.12em]',
              isDark ? 'text-white/30' : 'text-black/28',
            )}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <p
            className={cn(
              'm-0 text-md leading-[1.8] md:text-base md:leading-[1.85]',
              isDark ? 'text-white/85' : 'text-black/80',
            )}
          >
            {item}
          </p>
        </article>
      ))}
    </div>
  );
};

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useProjectsQuery();
  const companyQuery = useCompaniesQuery();
  const isDark = useTheme().palette.mode === 'dark';

  const visibleProjects = (data ?? []).filter(item => item.isVisible && item.slug);
  const projectIndex = visibleProjects.findIndex(item => item.slug === slug);
  const project = projectIndex >= 0 ? visibleProjects[projectIndex] : data?.find(item => item.slug === slug);
  const previousProject = projectIndex > 0 ? visibleProjects[projectIndex - 1] : null;
  const nextProject =
    projectIndex >= 0 && projectIndex < visibleProjects.length - 1
      ? visibleProjects[projectIndex + 1]
      : null;

  const companies = companyQuery.data;
  const companyName = companies?.find(company => company.id === project?.companyId)?.name;
  const previousMeta = previousProject ? getProjectNavMeta(previousProject, companies) : null;
  const nextMeta = nextProject ? getProjectNavMeta(nextProject, companies) : null;

  const bgClass = cn(
    'min-h-screen w-full',
    isDark ? 'bg-[#181717] text-white' : 'bg-[#fafafa] text-[#181717]',
  );

  if (!project) {
    return (
      <div className={cn(bgClass, 'flex items-center justify-center')}>
        <p className={cn('text-base font-semibold', isDark ? 'text-white/70' : 'text-black/65')}>
          Project not found
        </p>
      </div>
    );
  }

  const intro = (project.hero || project.summary || project.description || '').trim();
  const problem = (project.problem || project.asls?.map(item => item.plain_text).join('\n') || '').trim();
  const solution = (
    project.solution ||
    project.challenge?.map(item => item.plain_text).join('\n') ||
    ''
  ).trim();
  const impact = (project.impact || project.tobe?.map(item => item.plain_text).join('\n') || '').trim();
  const architecture = project.architecture?.trim() || '';
  const keyFeatures = project.keyFeatures?.trim() || '';
  const keyContributions = project.keyContributions?.trim() || '';
  const contributionItems = parseKeyContributionItems(keyContributions);
  const featureItems = toContentItems(keyFeatures);
  const architectureItems = toContentItems(architecture);
  const impactItems = toContentItems(impact);

  const keywords = (project.keywords ?? []).map(tag => tag.name).filter(Boolean);
  const domains = (project.domain ?? []).map(tag => tag.name).filter(Boolean);
  const projectTypes = (project.projectType ?? []).map(tag => tag.name).filter(Boolean);
  const techStack = project.techStack ?? [];
  const mainSkills = (project.mainSkills ?? []).map(tag => tag.name).filter(Boolean);

  const typeLabels = [...projectTypes, ...domains].filter(Boolean);
  const hasParticipants = project.numberOfParticipants > 0;
  const hasParticipationRate = typeof project.participationRate === 'number';
  const hasRoleMeta =
    Boolean(project.role?.trim()) || hasParticipants || hasParticipationRate;
  const hasContributions = contributionItems.length > 0;
  const hasProblemSolution = Boolean(problem || solution);
  const hasKeyImplementations = featureItems.length > 0;
  const hasArchitecture = architectureItems.length > 0;
  const hasImpact = impactItems.length > 0;

  const mutedText = isDark ? 'text-white/55' : 'text-black/50';
  const panelBorder = isDark ? 'border-white/12' : 'border-black/10';
  const panelBg = isDark ? 'bg-white/[0.03]' : 'bg-black/[0.02]';

  return (
    <div className={bgClass}>
      <main className='mx-auto flex w-full max-w-[800px] flex-col gap-16 px-5 py-12 md:gap-20 md:px-6 md:py-16'>
        {/* Section 1. Project Overview */}
        <header className='flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
            <h1 className='m-0 text-3xl font-black leading-tight tracking-tight md:text-[2.75rem]'>
              {project.name}
            </h1>
            <div className={cn('flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium', mutedText)}>
              {project.period && <span>{project.period}</span>}
              {companyName && (
                <>
                  <span aria-hidden className='opacity-40'>
                    ·
                  </span>
                  <span>{companyName}</span>
                </>
              )}
              {typeLabels.length > 0 && (
                <>
                  <span aria-hidden className='opacity-40'>
                    ·
                  </span>
                  <span>{typeLabels.join(' / ')}</span>
                </>
              )}
            </div>
          </div>

          {intro && (
            <p
              className={cn(
                'm-0 text-base font-medium leading-[1.75] md:text-lg md:leading-[1.8]',
                isDark ? 'text-white/85' : 'text-black/80',
              )}
            >
              {intro}
            </p>
          )}

          {keywords.length > 0 && (
            <div className='flex flex-wrap gap-1.5'>
              {keywords.map(label => (
                <MetaChip key={label} label={label} isDark={isDark} />
              ))}
            </div>
          )}

          {(techStack.length > 0 || mainSkills.length > 0) && (
            <div className='flex flex-col gap-2'>
              <p className={cn('m-0 text-xs font-semibold uppercase tracking-wider', mutedText)}>
                Tech Stack
              </p>
              <div className='flex flex-wrap gap-1.5'>
                {[...mainSkills, ...techStack.filter(stack => !mainSkills.includes(stack))].map(
                  label => (
                    <MetaChip key={label} label={label} isDark={isDark} />
                  ),
                )}
              </div>
            </div>
          )}
        </header>

        {/* Section 2. My Role */}
        {hasRoleMeta && (
          <section className='flex flex-col gap-5'>
            <SectionHeading isDark={isDark}>My Role</SectionHeading>

            <div className='flex flex-col gap-3'>
              {project.role?.trim() && (
                <p
                  className={cn(
                    'm-0 text-[15px] leading-[1.75] md:text-base md:leading-[1.8]',
                    isDark ? 'text-white/80' : 'text-black/75',
                  )}
                >
                  <span className={cn('font-semibold', isDark ? 'text-white' : 'text-[#181717]')}>
                    Role
                  </span>
                  <span className={cn('mx-2 opacity-40', mutedText)}>·</span>
                  <span>{project.role.trim()}</span>
                </p>
              )}

              {(hasParticipants || hasParticipationRate) && (
                <p
                  className={cn(
                    'm-0 text-[15px] leading-[1.75] md:text-base md:leading-[1.8]',
                    isDark ? 'text-white/80' : 'text-black/75',
                  )}
                >
                  <span className={cn('font-semibold', isDark ? 'text-white' : 'text-[#181717]')}>
                    Participation
                  </span>
                  <span className={cn('mx-2 opacity-40', mutedText)}>·</span>
                  <span>
                    {[
                      hasParticipants ? `${project.numberOfParticipants}명` : null,
                      hasParticipationRate ? `${project.participationRate}%` : null,
                    ]
                      .filter(Boolean)
                      .join(' / ')}
                  </span>
                </p>
              )}
            </div>
          </section>
        )}

        {hasContributions && (
          <section className='flex flex-col gap-5'>
            <SectionHeading isDark={isDark}>Key Contributions</SectionHeading>
            <ContributionCards items={contributionItems} isDark={isDark} />
          </section>
        )}

        {/* Section 3. Problem & Solution */}
        {hasProblemSolution && (
          <section className='flex flex-col gap-5'>
            <SectionHeading isDark={isDark}>
              {problem && solution ? 'Problem & Solution' : problem ? 'Problem' : 'Solution'}
            </SectionHeading>
            <div
              className={cn(
                'grid w-full grid-cols-1 gap-4 md:gap-5',
                problem && solution ? 'md:grid-cols-2' : 'md:grid-cols-1',
              )}
            >
              {problem && (
                <div
                  className={cn(
                    'flex w-full flex-col gap-3 rounded-lg border px-5 py-5 md:px-6 md:py-6',
                    panelBorder,
                    panelBg,
                  )}
                >
                  {problem && solution && (
                    <h3
                      className={cn(
                        'm-0 text-sm font-bold tracking-wide',
                        isDark ? 'text-white/80' : 'text-black/70',
                      )}
                    >
                      Problem
                    </h3>
                  )}
                  <p
                    className={cn(
                      'm-0 whitespace-pre-line text-base leading-[1.8] md:text-[17px] md:leading-[1.85]',
                      isDark ? 'text-white/80' : 'text-black/75',
                    )}
                  >
                    {problem}
                  </p>
                </div>
              )}
              {solution && (
                <div
                  className={cn(
                    'flex w-full flex-col gap-3 rounded-lg border px-5 py-5 md:px-6 md:py-6',
                    panelBorder,
                    panelBg,
                  )}
                >
                  {problem && solution && (
                    <h3
                      className={cn(
                        'm-0 text-sm font-bold tracking-wide',
                        isDark ? 'text-white/80' : 'text-black/70',
                      )}
                    >
                      Solution
                    </h3>
                  )}
                  <p
                    className={cn(
                      'm-0 whitespace-pre-line text-base leading-[1.8] md:text-[17px] md:leading-[1.85]',
                      isDark ? 'text-white/80' : 'text-black/75',
                    )}
                  >
                    {solution}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Section 4. Key Implementations — screenshots 없으면 기능 텍스트만 */}
        {hasKeyImplementations && (
          <section className='flex flex-col gap-5'>
            <SectionHeading isDark={isDark}>Key Implementations</SectionHeading>
            <div className='flex flex-col gap-4'>
              {featureItems.map((feature, index) => (
                <div
                  key={`${feature}_${index}`}
                  className={cn('flex gap-3 border-l-2 pl-4', isDark ? 'border-white/20' : 'border-black/15')}
                >
                  <BodyText isDark={isDark}>{feature}</BodyText>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5. Architecture */}
        {hasArchitecture && (
          <section className='flex flex-col gap-5'>
            <SectionHeading isDark={isDark}>Architecture</SectionHeading>
            <ArchitectureSection
              content={architecture}
              isDark={isDark}
              fallback={
                splitContentLines(architecture).some(isBulletLine) || architectureItems.length > 1 ? (
                  <ItemList items={architectureItems} isDark={isDark} />
                ) : (
                  <BodyText isDark={isDark}>{architecture}</BodyText>
                )
              }
            />
          </section>
        )}

        {/* Section 6. Impact */}
        {hasImpact && (
          <section className='flex flex-col gap-5'>
            <SectionHeading isDark={isDark}>Impact</SectionHeading>
            {impactItems.length > 1 ? (
              <ItemList items={impactItems} isDark={isDark} />
            ) : (
              <BodyText isDark={isDark}>{impact}</BodyText>
            )}
          </section>
        )}

        {/* Section 7. Navigation */}
        <nav
          aria-label='Project navigation'
          className={cn(
            'flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between',
            isDark ? 'border-white/10' : 'border-black/8',
          )}
        >
          <div className='flex min-w-0 flex-1 flex-col gap-1'>
            {previousProject ? (
              <NavProjectLink
                label='← Previous'
                project={previousProject}
                meta={previousMeta}
                isDark={isDark}
              />
            ) : (
              <span />
            )}
          </div>

          <Link
            to='/projects'
            className={cn(
              'shrink-0 text-sm font-medium transition-colors',
              isDark ? 'text-white/50 hover:text-white/80' : 'text-black/45 hover:text-black/75',
            )}
          >
            All Projects
          </Link>

          <div className='flex min-w-0 flex-1 flex-col gap-1 sm:items-end'>
            {nextProject ? (
              <NavProjectLink
                label='Next →'
                project={nextProject}
                meta={nextMeta}
                isDark={isDark}
                align='end'
              />
            ) : (
              <span />
            )}
          </div>
        </nav>
      </main>
    </div>
  );
};

export default ProjectDetailPage;
