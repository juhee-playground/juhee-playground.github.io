import { useTheme } from '@mui/material/styles';

import ProjectSection from '@/components/project/ProjectSection';
import { cn } from '@/utils/classNames';

interface IProjectLessonsProps {
  lessons: string[];
}

const ProjectLessons = ({ lessons }: IProjectLessonsProps) => {
  const isDark = useTheme().palette.mode === 'dark';

  return (
    <ProjectSection id='lessons' label='Lessons' delay={0.04}>
      <ol className='flex flex-col gap-3'>
        {lessons.map((item, i) => (
          <li key={i} className='flex items-start gap-3'>
            <span
              className={cn(
                'mt-0.5 text-[10px] font-black tabular-nums w-5 shrink-0',
                isDark ? 'text-white/25' : 'text-black/25',
              )}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className={cn('text-sm leading-relaxed', isDark ? 'text-white/70' : 'text-black/65')}>
              {item}
            </span>
          </li>
        ))}
      </ol>
    </ProjectSection>
  );
};

export default ProjectLessons;
