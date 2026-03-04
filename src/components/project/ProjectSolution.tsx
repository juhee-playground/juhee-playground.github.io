import { useTheme } from '@mui/material/styles';

import ProjectSection from '@/components/project/ProjectSection';
import { cn } from '@/utils/classNames';

interface IProjectSolutionProps {
  content: string;
}

const ProjectSolution = ({ content }: IProjectSolutionProps) => {
  const isDark = useTheme().palette.mode === 'dark';

  return (
    <ProjectSection id='solution' label='Solution' delay={0.04}>
      <p className={cn('text-sm leading-relaxed', isDark ? 'text-white/65' : 'text-black/60')}>
        {content}
      </p>
    </ProjectSection>
  );
};

export default ProjectSolution;
