import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import usePrintMode from '@/hooks/usePrintMode';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';
import { parseCompanyData } from '@/utils/parser';

import SubListItem from './SubListItem';

const CardListItem = ({ isLastCompany, info, subInfo, filters }: ICardListProps) => {
  const companyData = parseCompanyData(info);
  const { pointColor } = useSettings();
  const { isPrintMode, mode } = usePrintMode();
  const isDark = useTheme().palette.mode === 'dark';

  return (
    <>
      <div
        key={`company__${companyData.id}`}
        className={cn('flex flex-col px-3', isPrintMode && `box__container--${mode}`)}
        id={companyData.id}
      >
        <div className='flex flex-col'>
          <div className='flex items-center py-1'>
            <span className='text-2xl font-semibold leading-none m-0'>{companyData.name}</span>

            <Box className='ml-5'>
              <Typography variant='caption' color='text.primary' className='text-sm font-semibold leading-none m-0'>
                {companyData.startDate}
              </Typography>
              {companyData.startDate && (
                <Typography variant='caption' color='text.primary' className='text-sm leading-none m-0'>
                  ~
                </Typography>
              )}
              <Typography variant='caption' color='text.primary' className='text-sm font-semibold leading-none m-0'>
                {companyData.endDate}
              </Typography>
              <Typography variant='caption' color='text.primary' className='text-sm leading-none m-0'>
                {companyData.period}
              </Typography>
            </Box>
          </div>

          {companyData.type === 'C' && (
            <p className='py-1'>
              <span className='text-sm font-semibold leading-none m-0'>{companyData.role}</span>
              <span className='text-sm leading-none m-0'> | </span>
              <span className='text-sm font-semibold leading-none m-0'>{companyData.department}</span>
              <span className='text-sm leading-none m-0'> | 설립년도:</span>
              <span className='text-sm font-semibold leading-none m-0'> {companyData.year}</span>
              <span className='text-sm leading-none m-0'> | 회사규모: </span>
              <span className='text-sm font-semibold leading-none m-0'> {companyData.scale}</span>
            </p>
          )}

          <p className='flex flex-col mb-3'>
            {companyData.description.map((text, index) => (
              <span key={`description_${index}`} className='text-sm leading-none m-0'>
                {text}
              </span>
            ))}
          </p>
        </div>

        <div className='flex items-center gap-3 my-3'>
          <span
            className={cn(
              'text-[10px] font-black tracking-widest uppercase shrink-0',
              isDark ? 'text-white/35' : 'text-black/35',
              mode === 'print' && 'text-[#666]!',
            )}
          >
            WORK EXPERIENCE
          </span>
          <div
            className={cn(
              'flex-1 h-px',
              isDark ? 'bg-white/6' : 'bg-black/6',
              mode === 'print' && 'bg-[#ddd]!',
            )}
          />
        </div>

        <div className='my-3'>
          {subInfo
            ?.filter(project => project.company?.relation?.[0]?.id === companyData.id)
            .map((project: IProjectProperties, index: number) => (
              <SubListItem key={`${index}_${project.id}`} filters={filters} info={project} />
            ))}
        </div>
      </div>

      {!isLastCompany && (
        <div
          className={cn(
            'h-px w-full my-4',
            isDark ? 'bg-white/6' : 'bg-black/6',
            mode === 'print' && 'bg-[#ddd]!',
          )}
        />
      )}
    </>
  );
};

export default CardListItem;
