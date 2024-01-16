import React, { useMemo } from 'react';
import { useAppSelector } from 'redux/hooks';
import { format } from 'date-fns';
import type { RootState } from 'redux/store';

import { parserPeriod } from 'utils/Parser';
import SubListItem from './SubListItem';
function CardListItem(props: CardListProps) {
  const date = props.info.period.date;
  const companyData = {
    id: props.info.id,
    name: props.info.name.title[0].plain_text,
    startDate: date?.start ? format(new Date(date.start), 'yyyy/MM') : '',
    endDate: date?.start ? format(new Date(date.end), 'yyyy/MM') : '',
    department: props.info.department.rich_text[0].plain_text,
    role: props.info.role.select.name,
    period: date?.start ? parserPeriod(date) : '',
  };

  const { isPrintMode } = useAppSelector((state: RootState) => state.settings);
  const mode = isPrintMode ? 'print' : '';

  const isWave = useMemo(() => (companyData.startDate !== '' ? `~` : null), []);
  const periodString =
    companyData.startDate !== ''
      ? `${companyData.startDate} ${isWave} ${companyData.endDate} / ${companyData.period}`
      : '';
  return (
    <>
      <div
        key={`company__${companyData.id}`}
        className={isPrintMode ? `box__container box__container--${mode}` : 'box__container'}
        id={companyData.id}
      >
        <div className={isPrintMode ? `left left--${mode}` : 'left'}>
          <span className='text text__sub period'>{companyData.startDate}</span>
          <span className='text text__plain period'> {isWave} </span>
          <span className='text text__sub period'>{companyData.endDate}</span>
          <div className='text text__plain'>{companyData.period}</div>
        </div>
        <div className='right'>
          <span className='text text__title'>{companyData.name}</span>
          {isPrintMode ? <span className='text text__sub printMode'>{periodString}</span> : ''}
          <div className='list chip'>
            <span className='text text__plain'>{companyData.role}</span>
            <span className='text text__plain'> / </span>
            <span className='text text__plain'>{companyData.department}</span>
          </div>
          <div className='projects'>
            {props.subInfo
              ? props.subInfo
                  .filter((project: { companyId: string }) => project.companyId === companyData.id)
                  .map((project: ProjectQuery) => {
                    return <SubListItem key={project.id} info={project} />;
                  })
              : null}
          </div>
        </div>
      </div>

      {props.isLastCompany ? '' : <hr className='line--bottom' />}
    </>
  );
}

export default CardListItem;
