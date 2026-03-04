import { Link, useParams } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import ProjectArchitecture from '@/components/project/ProjectArchitecture';
import ProjectFeatures from '@/components/project/ProjectFeatures';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectLessons from '@/components/project/ProjectLessons';
import ProjectProblem from '@/components/project/ProjectProblem';
import ProjectSolution from '@/components/project/ProjectSolution';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';
import { getProjectBySlug } from '@/utils/getProjectBySlug';

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';

  const project = slug ? getProjectBySlug(slug) : undefined;

  const bg = cn(
    'min-h-screen w-full',
    isDark ? 'bg-[#181717] text-white' : 'bg-[#fafafa] text-[#181717]',
  );

  if (!project) {
    return (
      <div className={cn(bg, 'flex items-center justify-center')}>
        <div className='text-center flex flex-col items-center gap-4'>
          <p className={cn('text-7xl font-black', isDark ? 'text-white/10' : 'text-black/8')}>404</p>
          <p className={cn('text-sm', isDark ? 'text-white/50' : 'text-black/50')}>
            프로젝트를 찾을 수 없어요.
          </p>
          <Link to='/projects' className='text-sm font-semibold underline' style={{ color: pointColor.hex }}>
            ← 전체 프로젝트 보기
          </Link>
        </div>
      </div>
    );
  }

  const { problem, solution, architecture, features, lessons } = project;

  return (
    <div className={bg}>
      <main className='max-w-[860px] mx-auto px-6 py-16'>

        {/* Breadcrumb */}
        <nav aria-label='breadcrumb' className='mb-10'>
          <Link
            to='/projects'
            className={cn(
              'text-sm transition-colors',
              isDark ? 'text-white/40 hover:text-white/75' : 'text-black/35 hover:text-black/65',
            )}
          >
            ← All Projects
          </Link>
        </nav>

        <ProjectHero project={project} />

        {problem && <ProjectProblem content={problem} />}
        {solution && <ProjectSolution content={solution} />}
        {architecture && <ProjectArchitecture content={architecture} />}
        {features && features.length > 0 && <ProjectFeatures features={features} />}
        {lessons && lessons.length > 0 && <ProjectLessons lessons={lessons} />}

      </main>

      <footer
        className={cn(
          'text-center py-8 text-xs border-t',
          isDark ? 'border-white/10 text-white/30' : 'border-black/10 text-black/30',
        )}
      >
        <Link
          to='/projects'
          className={cn('transition-colors', isDark ? 'hover:text-white/60' : 'hover:text-black/50')}
        >
          ← All Projects
        </Link>
      </footer>
    </div>
  );
};

export default ProjectDetailPage;
