import React, { useMemo } from 'react';

import SubListItem from './SubListItem';
function CardListItem(props: CardListProps) {
  const { startDate, endDate, period, name, role, department, id }: CompanyQuery = props.info;
  console.log(id);
  // 02458f34-9632-4ee9-9363-ec9b4dd9af2f
  // ac39715c-45de-4b35-9daa-30cf52a10664
  // f194e7b4-3174-4fd2-8dfc-17ea186dd8ed
  const isWave = useMemo(() => (startDate !== '' ? `~` : null), []);
  return (
    <div key={id} className='box__container' id={id}>
      <div className='left'>
        <span className='text text__sub period'>{startDate}</span>
        <span className='text text__plain period'> {isWave} </span>
        <span className='text text__sub period'>{endDate}</span>
        <div className='text text__plain'>{period}</div>
      </div>
      <div className='right'>
        <span className='text text__title'>{name}</span>
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
  );
}

export default CardListItem;
