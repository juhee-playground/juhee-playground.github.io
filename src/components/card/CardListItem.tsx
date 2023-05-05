import React from 'react';

import SubListItem from './SubListItem';
function CardListItem(props: CardListProps) {
  const { startDate, endDate, period, name, role, department, id }: CompanyQuery = props.info;
  return (
    <div key={id} className='box__container'>
      <div className='left'>
        <span className='text__sub'>{startDate}</span>
        <span className='text__plain'> {startDate !== '' ? `~` : null} </span>
        <span className='text__sub'>{endDate}</span>
        <div className='text__plain'>{period}</div>
      </div>
      <div className='right'>
        <span className='text__title'>{name}</span>
        <div className='list chip'>
          <span className='text__plain'>{role}</span>
          <span className='text__plain'> / </span>
          <span className='text__plain'>{department}</span>
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
  );
}

export default CardListItem;
