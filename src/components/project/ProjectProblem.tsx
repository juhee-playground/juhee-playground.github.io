import { useTheme } from '@mui/material/styles';

import ProjectSection from '@/components/project/ProjectSection';
import { cn } from '@/utils/classNames';

interface IProjectProblemProps {
  content: string;
}

const ProjectProblem = ({ content }: IProjectProblemProps) => {
  const isDark = useTheme().palette.mode === 'dark';

  return (
    <ProjectSection id='problem' label='Problem'>
      <p className={cn('text-sm leading-relaxed', isDark ? 'text-white/65' : 'text-black/60')}>
        {content}
      </p>
    </ProjectSection>
  );
};

export default ProjectProblem;
