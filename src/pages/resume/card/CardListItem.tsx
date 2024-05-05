import React, { useMemo } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { format } from 'date-fns';
import type { RootState } from '@/redux/store';

import { parserPeriod } from '@/utils/Parser';
import SubListItem from './SubListItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function CardListItem(props: CardListProps) {
  const date = props.info.period.date;
  const filters = props.filters;
  const companyData = {
    id: props.info.id,
    name: props.info.name.title[0].plain_text,
    description: props.info.description.rich_text[0].plain_text.split('- '),
    type: props.info.type.rich_text[0].plain_text,
    startDate: date?.start ? format(new Date(date.start), 'yyyy/MM') : '',
    endDate: date?.start ? format(new Date(date.end), 'yyyy/MM') : '',
    year: props.info.year.number,
    scale: props.info.scale.rich_text[0].plain_text,
    department: props.info.department.rich_text[0].plain_text,
    role: props.info.role.select.name,
    period: date?.start ? parserPeriod(date) : '',
  };

  const { isPrintMode, pointColor } = useAppSelector((state: RootState) => state.settings);
  const mode = isPrintMode ? 'print' : '';

  const isWave = useMemo(() => (companyData.startDate !== '' ? `~` : null), []);
  return (
    <>
      <div
        key={`company__${companyData.id}`}
        className={isPrintMode ? `box__container box__container--${mode}` : 'box__container'}
        id={companyData.id}
      >
        <div className='box__header'>
          <div className='row row__first'>
            <span className='text text__title'>{companyData.name}</span>
            <Box className='period__groups'>
              <Typography variant='caption' color='text.primary' className='text text__sub period'>
                {companyData.startDate}
              </Typography>
              <Typography variant='caption' color='text.primary' className='text text__plain period'>
                {isWave}
              </Typography>
              <Typography variant='caption' color='text.primary' className='text text__sub period'>
                {companyData.endDate}
              </Typography>
              <Typography variant='caption' color='text.primary' className='text text__plain period'>
                {companyData.period}
              </Typography>
            </Box>
          </div>
          {companyData.type === 'C' ? (
            <div className='row row__second'>
              <span className='text text__sub'>{companyData.role}</span>
              <span className='text text__plain'> | </span>
              <span className='text text__sub'>{companyData.department}</span>
              <span className='text text__plain'> | 설립년도:</span>
              <span className='text text__sub'> {companyData.year}</span>
              <span className='text text__plain'> | 회사규모: </span>
              <span className='text text__sub'> {companyData.scale}</span>
            </div>
          ) : (
            ''
          )}

          <div className='row row__third'>
            {companyData.description.map((description, index) => {
              return (
                <span key={`description_${index}`} className='text text__plain'>
                  {description}
                </span>
              );
            })}
          </div>
        </div>
        <div className='group__header'>
          <h4 style={{ color: pointColor }} className='box-title'>
            WORK EXPERIENCE
          </h4>
        </div>
        <div className='projects'>
          {props.subInfo
            ? props.subInfo
                .filter(project => project.company.relation[0].id === companyData.id)
                .map((project: ProjectProperties, index: number) => {
                  return <SubListItem key={`${index}_${project.id}`} filters={filters} info={project} />;
                })
            : null}
        </div>
      </div>
      {props.isLastCompany ? '' : <hr className='line--bottom' />}
    </>
  );
}

export default CardListItem;
