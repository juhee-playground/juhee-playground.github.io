import Box from '@mui/material/Box';
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

        <div className='flex items-center my-2'>
          <h4 style={{ color: pointColor.hex }} className='m-0 px-1 leading-7'>
            WORK EXPERIENCE
          </h4>
        </div>

        <div className='my-3'>
          {subInfo
            ?.filter(project => project.company?.relation?.[0]?.id === companyData.id)
            .map((project: IProjectProperties, index: number) => (
              <SubListItem key={`${index}_${project.id}`} filters={filters} info={project} />
            ))}
        </div>
      </div>

      {!isLastCompany && <hr className='bg-[#dddddd] h-px border-0' />}
    </>
  );
};

export default CardListItem;
