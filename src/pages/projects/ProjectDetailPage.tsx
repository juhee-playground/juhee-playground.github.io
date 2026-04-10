import { Link, useParams } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import useProjectsQuery from '@/hooks/queries/useProjectsQuery';
import { cn } from '@/utils/classNames';

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useProjectsQuery();
  const isDark = useTheme().palette.mode === 'dark';

  const project = data?.find(p => p.slug === slug);

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

  const summary = project.summary || project.description || '';
  const problem = project.problem || project.asls?.map(item => item.plain_text).join('\n') || '';
  const solution = project.solution || project.challenge?.map(item => item.plain_text).join('\n') || '';
  const impact = project.impact || project.tobe?.map(item => item.plain_text).join('\n') || '';
  const architecture = project.architecture || '';
  const keyFeatures = project.keyFeatures || '';

  const Section = ({ title, content }: { title: string; content: string }) => {
    if (!content) return null;
    return (
      <section className='flex flex-col gap-2'>
        <h2 className={cn('text-xs font-black tracking-widest uppercase', isDark ? 'text-white/45' : 'text-black/45')}>
          {title}
        </h2>
        <p className={cn('text-sm leading-relaxed whitespace-pre-line', isDark ? 'text-white/70' : 'text-black/65')}>
          {content}
        </p>
      </section>
    );
  };

  return (
    <div className={bgClass}>
      <main className='max-w-[800px] mx-auto px-6 py-16 flex flex-col gap-10'>
        <nav aria-label='breadcrumb'>
          <Link
            to='/projects'
            className={cn('text-sm transition-colors', isDark ? 'text-white/45 hover:text-white/75' : 'text-black/40 hover:text-black/70')}
          >
            ← All Projects
          </Link>
        </nav>

        <section className='flex flex-col gap-2'>
          <h1 className='text-4xl md:text-5xl font-black tracking-tight leading-tight'>{project.name}</h1>
          <p className={cn('text-sm font-semibold', isDark ? 'text-white/55' : 'text-black/50')}>{project.period}</p>
        </section>

        <Section title='Summary' content={summary} />
        <Section title='Problem' content={problem} />
        <Section title='Solution' content={solution} />
        <Section title='Architecture' content={architecture} />
        <Section title='Key Features' content={keyFeatures} />
        <Section title='Impact' content={impact} />

        {project.techStack.length > 0 && (
          <section className='flex flex-col gap-2'>
            <h2 className={cn('text-xs font-black tracking-widest uppercase', isDark ? 'text-white/45' : 'text-black/45')}>
              Tech Stack
            </h2>
            <div className='flex flex-wrap gap-1'>
              {project.techStack.map(stack => (
                <span
                  key={stack}
                  className={cn(
                    'text-[10px] px-2 py-0.5 rounded-full font-semibold',
                    isDark ? 'bg-white/10 text-white/70' : 'bg-black/6 text-black/60',
                  )}
                >
                  {stack}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProjectDetailPage;
