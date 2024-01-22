import React from 'react';
import { useAppSelector } from 'redux/hooks';
import type { RootState } from 'redux/store';

import LabelIcon from '@mui/icons-material/Label';
import Stack from '@mui/material/Stack';
import DChip from 'components/custom/DChip';

function SubListItem(props: SubListProps) {
  // const { id, name, numberOfParticipants, explain, period, stacks, contents, url }: ProjectQuery = ;
  const date = props.info.period.date;
  const projectData = {
    id: props.info.id,
    companyId: props.info.company.relation[0].id,
    name: props.info.name.title[0].plain_text,
    period: date.start ? `${date.start}~${date.end === null ? '' : date.end}` : '',
    mainSkills: [...props.info.mainStack.multi_select],
    skills: props.info.stack.multi_select,
    role: props.info.role.rich_text[0].plain_text,
    explain: props.info.explain.rich_text[0].plain_text,
    contents: props.info.result.rich_text[0].text.content.split('\n'),
    numberOfParticipants: props.info.numberOfParticipants.number,
    url: props.info.url.url,
  };

  const { pointColor, isPrintMode } = useAppSelector((state: RootState) => state.settings);
  const mode = isPrintMode ? 'print' : '';

  return (
    <div className='project__container' key={`project__${projectData.id}`}>
      <div className='list__item list__item--vertical'>
        <a className='title__link' href={projectData.url} target='_blank' rel='noreferrer'>
          <LabelIcon fontSize='small' className='text text__icon--pre' />
          <span className='text text__subTitle'>{projectData.name}</span>
        </a>
        <span className='numbers text__sub'>
          <span className='text text__plain period'>{projectData.period}</span>
        </span>
      </div>
      <div>
        참여인원: <span className='text__sub'>{projectData.numberOfParticipants}</span>
      </div>
      <div className='list__item explain'>
        <span className='text text__plain'>{projectData.explain}</span>
      </div>
      <div className='list__item period'></div>
      <div className='list__item stacks'>
        <ul className={isPrintMode ? `list__container--${mode}` : 'list__container'}>
          <Stack className='stacks' direction='row' spacing={1}>
            {projectData.mainSkills.map((select: SelectProperty) => (
              <DChip
                key={`stacks__${select.id}`}
                size='small'
                color={select.color}
                label={select.name}
                clickable={false}
              />
            ))}
          </Stack>
        </ul>
      </div>
      <div className='list__item results'>
        {projectData.contents.map((text: string, index: number) => (
          <span key={`result_content_${index}`} className='text text__plain'>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SubListItem;
