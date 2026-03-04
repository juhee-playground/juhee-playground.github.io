import { useTheme } from '@mui/material/styles';

import ProjectSection from '@/components/project/ProjectSection';
import { cn } from '@/utils/classNames';

interface IProjectArchitectureProps {
  content: string;
}

const ProjectArchitecture = ({ content }: IProjectArchitectureProps) => {
  const isDark = useTheme().palette.mode === 'dark';

  return (
    <ProjectSection id='architecture' label='Architecture' delay={0.04}>
      <p className={cn('text-sm leading-relaxed font-mono', isDark ? 'text-white/65' : 'text-black/60')}>
        {content}
      </p>
    </ProjectSection>
  );
};

export default ProjectArchitecture;
