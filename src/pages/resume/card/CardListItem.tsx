import React, { useMemo } from 'react';
import { useAppSelector } from 'redux/hooks';
import type { RootState } from 'redux/store';

import SubListItem from './SubListItem';
function CardListItem(props: CardListProps) {
  const { startDate, endDate, period, name, role, department, id }: CompanyQuery = props.info;
  const { isPrintMode } = useAppSelector((state: RootState) => state.settings);
  const mode = isPrintMode ? 'print' : '';

  const isWave = useMemo(() => (startDate !== '' ? `~` : null), []);
  const periodString = startDate !== '' ? `${startDate} ${isWave} ${endDate} / ${period}` : '';
  return (
    <>
      <div
        key={`company__${id}`}
        className={isPrintMode ? `box__container box__container--${mode}` : 'box__container'}
        id={id}
      >
        <div className={isPrintMode ? `left left--${mode}` : 'left'}>
          <span className='text text__sub period'>{startDate}</span>
          <span className='text text__plain period'> {isWave} </span>
          <span className='text text__sub period'>{endDate}</span>
          <div className='text text__plain'>{period}</div>
        </div>
        <div className='right'>
          <span className='text text__title'>{name}</span>
          {isPrintMode ? <span className='text text__sub printMode'>{periodString}</span> : ''}
          <div className='list chip'>
            <span className='text text__plain'>{role}</span>
            <span className='text text__plain'> / </span>
            <span className='text text__plain'>{department}</span>
          </div>
          <div className='projects'>
            {props.subInfo
              ? props.subInfo
                  .filter((project: { companyId: string }) => project.companyId === id)
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
