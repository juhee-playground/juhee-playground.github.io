import { useTheme } from '@mui/material/styles';

import ProjectSection from '@/components/project/ProjectSection';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

interface IProjectFeaturesProps {
  features: string[];
}

const ProjectFeatures = ({ features }: IProjectFeaturesProps) => {
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';

  return (
    <ProjectSection id='features' label='Key Features' delay={0.04}>
      <ul className='flex flex-col gap-2.5'>
        {features.map((item, i) => (
          <li key={i} className='flex items-start gap-3'>
            <span
              className='mt-[0.35rem] w-1.5 h-1.5 rounded-full shrink-0'
              style={{ backgroundColor: pointColor.hex }}
            />
            <span className={cn('text-sm leading-relaxed', isDark ? 'text-white/70' : 'text-black/65')}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </ProjectSection>
  );
};

export default ProjectFeatures;
