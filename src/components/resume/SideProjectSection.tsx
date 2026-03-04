import { useTheme } from '@mui/material/styles';

import CardListItem from '@/components/resume/card/CardListItem';
import { cn } from '@/utils/classNames';

interface ISideProjectSectionProps {
  data: ICompanyProperties[];
  projects: IProjectProperties[];
  filters: string[];
  pointColor: string;
}

const SideProjectSection = ({ data, projects, filters }: ISideProjectSectionProps) => {
  const isDark = useTheme().palette.mode === 'dark';

  return (
    <section className='p-1 px-2'>
      <div className='flex items-center gap-3 mb-4'>
        <span
          className={cn(
            'text-xs font-black tracking-widest uppercase shrink-0',
            isDark ? 'text-white/40' : 'text-black/40',
          )}
        >
          ⚽️ SIDE PROJECT
        </span>
        <div className={cn('flex-1 h-px', isDark ? 'bg-white/10' : 'bg-black/8')} />
      </div>

      {data.map((company, index) => (
        <CardListItem
          key={company.id}
          info={company}
          filters={filters}
          subInfo={projects}
          isLastCompany={!filters[index + 1]}
        />
      ))}
    </section>
  );
};

export default SideProjectSection;
