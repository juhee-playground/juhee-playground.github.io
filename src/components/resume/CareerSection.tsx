import { useTheme } from '@mui/material/styles';

import CardListItem from '@/components/resume/card/CardListItem';
import { cn } from '@/utils/classNames';

interface ICareerSectionProps {
  data: ICompanyProperties[];
  projects: IProjectProperties[];
  filters: string[];
  pointColor: string;
}

const CareerSection = ({ data, projects, filters }: ICareerSectionProps) => {
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
          ⚽️ CAREER
        </span>
        <div className={cn('flex-1 h-px', isDark ? 'bg-white/10' : 'bg-black/[0.08]')} />
      </div>

      {data.map((company, index) => (
        <CardListItem
          key={company.id}
          info={company}
          subInfo={projects}
          filters={filters}
          isLastCompany={!filters[index + 1]}
        />
      ))}
    </section>
  );
};

export default CareerSection;
