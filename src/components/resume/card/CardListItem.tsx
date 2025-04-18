import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import usePrintMode from '@/hooks/usePrintMode';
import { useAppSelector } from '@/redux/hooks';
import type { TRootState } from '@/redux/store';
import { parseCompanyData } from '@/utils/parser';

import SubListItem from './SubListItem';

const CardListItem = ({ isLastCompany, info, subInfo, filters }: ICardListProps) => {
  const companyData = parseCompanyData(info);
  const { pointColor } = useAppSelector((state: TRootState) => state.settings);
  const { mode, isPrintMode } = usePrintMode();

  return (
    <>
      <div
        key={`company__${companyData.id}`}
        className={`box__container${isPrintMode ? ` box__container--${mode}` : ''}`}
        id={companyData.id}
      >
        <div className='box__header'>
          <div className='row row__first'>
            <span className='text text__title'>{companyData.name}</span>

            <Box className='period__groups'>
              <Typography variant='caption' color='text.primary' className='text text__sub period'>
                {companyData.startDate}
              </Typography>
              {companyData.startDate && (
                <Typography variant='caption' color='text.primary' className='text text__plain period'>
                  ~
                </Typography>
              )}
              <Typography variant='caption' color='text.primary' className='text text__sub period'>
                {companyData.endDate}
              </Typography>
              <Typography variant='caption' color='text.primary' className='text text__plain period'>
                {companyData.period}
              </Typography>
            </Box>
          </div>

          {companyData.type === 'C' && (
            <p className='row row__second'>
              <span className='text text__sub'>{companyData.role}</span>
              <span className='text text__plain'> | </span>
              <span className='text text__sub'>{companyData.department}</span>
              <span className='text text__plain'> | 설립년도:</span>
              <span className='text text__sub'> {companyData.year}</span>
              <span className='text text__plain'> | 회사규모: </span>
              <span className='text text__sub'> {companyData.scale}</span>
            </p>
          )}

          <p className='row row__third'>
            {companyData.description.map((text, index) => (
              <span key={`description_${index}`} className='text text__plain'>
                {text}
              </span>
            ))}
          </p>
        </div>

        <div className='group__header'>
          <h4 style={{ color: pointColor.hex }} className='box-title'>
            WORK EXPERIENCE
          </h4>
        </div>

        <div className='projects'>
          {subInfo
            ?.filter(project => project.company?.relation?.[0]?.id === companyData.id)
            .map((project: IProjectProperties, index: number) => (
              <SubListItem key={`${index}_${project.id}`} filters={filters} info={project} />
            ))}
        </div>
      </div>

      {!isLastCompany && <hr className='line--bottom' />}
    </>
  );
};

export default CardListItem;
